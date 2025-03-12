import { useRef, useEffect, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { useMediaQuery } from 'react-responsive';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOutCubic',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Adjust animation parameters for mobile
  const mobileDelay = isMobile ? delay * 0.7 : delay;
  const mobileBlur = isMobile ? '5px' : '10px';
  
  const defaultFrom = direction === 'top'
    ? { filter: `blur(${mobileBlur})`, opacity: 0, transform: 'translate3d(0,-50px,0)' }
    : { filter: `blur(${mobileBlur})`, opacity: 0, transform: 'translate3d(0,50px,0)' };
    
  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform: direction === 'top' ? 'translate3d(0,5px,0)' : 'translate3d(0,-5px,0)',
    },
    {
      filter: 'blur(0px)',
      opacity: 1,
      transform: 'translate3d(0,0,0)',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to: inView
        ? async (next) => {
            for (const step of (animationTo || defaultTo)) {
              await next(step);
            }
            animatedCount.current += 1;
            if (animatedCount.current === elements.length && onAnimationComplete) {
              onAnimationComplete();
            }
          }
        : animationFrom || defaultFrom,
      delay: i * mobileDelay,
      config: { easing },
    }))
  );

  return (
    <span ref={ref} className={`blur-text ${className}`} style={{ display: 'inline-block' }}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={{
            ...props,
            display: 'inline-block',
            marginRight: animateBy === 'words' ? '0.25em' : '',
            fontSize: isMobile ? 'clamp(0.8rem, 4vw, 1rem)' : 'inherit',
          }}
        >
          {elements[index]}
        </animated.span>
      ))}
    </span>
  );
};

export default BlurText;
