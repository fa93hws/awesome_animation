export interface ICarouselItem {
  imgUrl: string,
  color: {
    inner: string;
    outer: string;
    icon: string;
    text: string;
  }
  text: {
    center: string;
    bottom: {
      abstract: string;
      colorlessTitle: string;
      coloredTitle: string;
      footnote: string;
    }
  }  
}

export interface ICarouselConfig {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  imageSize: {
    height: number;
    width: number;
  }
  items: ICarouselItem[];
  timer: {
    // three pharse, mid title, bottom divs and right carousel
    // in ms
    start: [number, number, number];
    duration: [number, number, number];
  }
}

class Carousel {
  private config: ICarouselConfig;
  private frameId: string = 'carouselFrame';
  private listId: string = 'carouselList';
  private innerId: string = 'carouselInnerContainer';
  private nextButtonId: string = 'carouselNextButton';
  private centerTextId: string = 'carouselCenterText';
  private abstract: string = 'carouselBottomAbstract';
  private colorlessTitle: string = 'carouselBottomColorlessTitle';
  private coloredTitle: string = 'carouselBottomColoredTitle';
  private animationClass: string = 'animation';
  private currentIdx!: number;
  private totalDuration: number;

  public constructor(config: ICarouselConfig) {
    this.config = config;
    this.config.autoPlay = config.autoPlay === undefined ? false : config.autoPlay;
    this.config.autoPlayInterval = config.autoPlayInterval === undefined ? 5000 : config.autoPlayInterval;

    this.next = this.next.bind(this);
    this.carouselNext = this.carouselNext.bind(this);
    this.totalDuration = Math.max(...
      config.timer.start.map((t,idx) => t + config.timer.duration[idx])
    );

  }

  public init(): void {
    const isValid: boolean = this.checkDomExistence();
    if (isValid === false) {
      alert('Not all dom area available');
      return;
    }
    const styleEle: HTMLStyleElement = document.createElement('style');
    styleEle.innerHTML = `
    #carouselContainer {
      --img-height: ${this.config.imageSize.height}px;
      --img-width: ${this.config.imageSize.width}px;
      --carousel-sliding-duration: ${this.config.timer.duration[2]/1000}s;
      --mid-text-sliding-duration: ${this.config.timer.duration[0]/1000}s;
      --bottom-column-sliding-duration: ${this.config.timer.duration[1]/1000}s;
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(styleEle);
    const numItem: number = this.config.items.length;
    const extendedItems: ICarouselItem[] = [this.config.items[numItem - 1], ...this.config.items, this.config.items[0]];
    const carouselList:HTMLUListElement = document.getElementById(this.listId)! as HTMLUListElement;
    extendedItems.forEach(item => {
      const li: HTMLLIElement = document.createElement('li');
      li.style.backgroundImage = `url('${item.imgUrl}')`;
      li.classList.add('carousel__item');
      carouselList.appendChild(li);
    })
    const firstItem = this.config.items[0];
    document.getElementById(this.centerTextId)!.innerHTML = firstItem.text.center;
    document.getElementById(this.abstract)!.innerHTML = firstItem.text.bottom.abstract;
    document.getElementById(this.coloredTitle)!.innerHTML = firstItem.text.bottom.coloredTitle;
    document.getElementById(this.coloredTitle)!.style.color = firstItem.color.text;
    document.getElementById(this.colorlessTitle)!.innerHTML = firstItem.text.bottom.colorlessTitle;
    document.getElementById(this.innerId)!.style.borderColor = firstItem.color.outer;
    Array.from(document.getElementsByClassName('carousel__mid-bottom-div')!).forEach((item: HTMLElement) => 
      item.style.background = firstItem.color.inner
    )
    // document.getElementById(this.)
    this.currentIdx = 1;
    this.doCarouselTransform();
    document.getElementById(this.listId)!.classList.add('animation');
    this.addEvents();
  }

  private addEvents(): void {
    document.getElementById(this.nextButtonId)!.addEventListener('click', this.next);
  }

  private next(): void {
    document.getElementById(this.nextButtonId)!.classList.remove('show');
    const realIdx = this.getRealIdx(this.currentIdx);
    const nextRealIdx = realIdx === this.config.items.length - 1 ? 0 : realIdx + 1;
    setTimeout(() => this.showMidTextAnimation(this.config.items[nextRealIdx].text.center), this.config.timer.start[0]);
    setTimeout(() => this.showBottomDivAnimation(nextRealIdx), this.config.timer.start[1]);
    setTimeout(this.carouselNext, this.config.timer.start[2]);
    setTimeout(()=>
      document.getElementById(this.nextButtonId)!.classList.add('show'), this.totalDuration*1.01
    )
  }

  private carouselNext(): void {
    if (this.currentIdx >= this.config.items.length + 1) {
      this.currentIdx = 1;
      document.getElementById(this.listId)!.classList.remove(this.animationClass);
      this.doCarouselTransform();
      setTimeout(() => {
        document.getElementById(this.listId)!.classList.add(this.animationClass);
        this.carouselNext();
      },32)
      return;
    }
    this.currentIdx++;
    this.doCarouselTransform();
  }

  private doCarouselTransform(): void {
    const translateDistance: number = this.currentIdx * this.config.imageSize.height;
    document.getElementById(this.listId)!.style.transform = `translateY(${-translateDistance}px)`;
    const realIdx = this.getRealIdx(this.currentIdx);
    console.log(realIdx,this.currentIdx);
  }

  private showMidTextAnimation(text: string) : void {
    document.getElementById(this.centerTextId)!.classList.remove(this.animationClass);
    setTimeout(() => document.getElementById(this.centerTextId)!.classList.add(this.animationClass),32);
    setTimeout(() => document.getElementById(this.centerTextId)!.innerHTML = text, this.config.timer.duration[0]/2);
  }
  private showBottomDivAnimation(nextRealIdx: number) : void {
    const eles = Array.from(document.getElementsByClassName('carousel__mid-bottom-div')!);
    eles.forEach(ele => ele.classList.remove(this.animationClass));
    setTimeout(() => {
      eles.forEach(ele => ele.classList.add(this.animationClass));
    },32)
    setTimeout(() => {
      const item = this.config.items[nextRealIdx];
      document.getElementById(this.abstract)!.innerHTML = item.text.bottom.abstract;
      document.getElementById(this.coloredTitle)!.innerHTML = item.text.bottom.coloredTitle;
      document.getElementById(this.coloredTitle)!.style.color = item.color.text;
      document.getElementById(this.colorlessTitle)!.innerHTML = item.text.bottom.colorlessTitle;
      document.getElementById(this.innerId)!.style.borderColor = item.color.outer;
      Array.from(document.getElementsByClassName('carousel__mid-bottom-div')!).forEach((ele: HTMLElement) => 
        ele.style.background = item.color.inner
      )
    }, this.config.timer.duration[1]*0.65)
    // document.getElementById(this.centerTextId)!.classList.remove(this.animationClass);
    // setTimeout(() => document.getElementById(this.centerTextId)!.classList.add(this.animationClass),32);
  }

  private checkDomExistence(): boolean {
    const ids: string[] = [this.frameId, this.listId, this.innerId, this.nextButtonId, this.centerTextId, this.abstract, this.coloredTitle, this.colorlessTitle];
    const existence: boolean[] = ids.map(id => document.getElementById(id) === null);
    return existence.findIndex(e => e) < 0 ? true: false;
  }

  private getRealIdx(extendedIdx: number) {
    const realLength = this.config.items.length;
    if (extendedIdx === 0) {
      return realLength - 1;
    } else if (extendedIdx === realLength + 1) {
      return 0;
    } else {
      return extendedIdx - 1;
    }
  }

  public print() {
  }
}

export default Carousel;