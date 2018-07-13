import Carousel, { ICarouselConfig, ICarouselItem } from './carousel';
import './style.css';

const items: ICarouselItem[] = [
  {
    imgUrl: 'http://wx1.sinaimg.cn/large/5fb938d6gy1ft8r95b8ehj209q0dwglg.jpg',
    color: {
      inner: '#ff9ff3',
      outer: '#f368e0',
      icon: 'white',
      text: '#f368e0'
    },
    text: {
      center: 'A journal for ...',
      bottom: {
        abstract: 'BURCHART',
        colorlessTitle: 'Pea leaves & oil',
        coloredTitle: 'dream',
        footnote: 'footnote footnote footnote'
      }
    }
  },
  {
    imgUrl: 'http://wx3.sinaimg.cn/large/5fb938d6gy1ft8r95c7e6j209q0dwglf.jpg',
    color: {
      inner: '#1dd1a1',
      outer: '#10ac84',
      icon: 'black',
      text: '#10ac84'
    },
    text: {
      center: 'A journal1 for ...',
      bottom: {
        abstract: 'BURCHART1',
        colorlessTitle: 'Pea leaves & oil1',
        coloredTitle: 'dream1',
        footnote: 'footnote1 footnote1 footnote1'
      }
    }
  },
  {
    imgUrl: 'http://wx3.sinaimg.cn/large/5fb938d6gy1ft8r959akvj209q0dw3yc.jpg',
    color: {
      inner: '#feca57',
      outer: '#ff9f43',
      icon: 'white',
      text: '#ff9f43'
    },
    text: {
      center: 'A journal2 for ...',
      bottom: {
        abstract: 'BURCHART2',
        colorlessTitle: 'Pea leaves & oil2',
        coloredTitle: 'dream2',
        footnote: 'footnote2 footnote2 footnote2'
      }
    }
  },
  {
    imgUrl: 'http://wx4.sinaimg.cn/large/5fb938d6gy1ft8r95bbcoj209q0dwa9w.jpg',
    color: {
      inner: '#48dbfb',
      outer: '#0abde3',
      icon: 'white',
      text: '#0abde3'
    },
    text: {
      center: 'A journal3 for ...',
      bottom: {
        abstract: 'BURCHART3',
        colorlessTitle: 'Pea leaves & oil3',
        coloredTitle: 'dream3',
        footnote: 'footnote2 footnote2 footnote2'
      }
    }
  },
]
const carouselConfig: ICarouselConfig = {
  autoPlay: false,
  autoPlayInterval: 5000, // ms

  imageSize: {
    width: 350,
    height: 500
  },
  items,
  timer: {
    start: [0,200,500],
    duration: [2000,2000,1000]
  }
}

const carousel = new Carousel(carouselConfig);
carousel.print();
carousel.init();
