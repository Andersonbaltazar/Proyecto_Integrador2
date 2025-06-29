import { useEffect, useRef } from 'react';

export const useEnhancedEffects = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Intersection Observer para animaciones de entrada
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const addHoverEffect = (element) => {
    if (!element) return;

    const handleMouseEnter = () => {
      element.style.transform = 'translateY(-5px) scale(1.02)';
      element.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translateY(0) scale(1)';
      element.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  };

  const addClickEffect = (element) => {
    if (!element) return;

    const handleClick = () => {
      element.style.transform = 'scale(0.95)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 150);
    };

    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('click', handleClick);
    };
  };

  const addScrollEffect = (element, threshold = 0.5) => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          } else {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  };

  const addParallaxEffect = (element, speed = 0.5) => {
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  };

  const addTypingEffect = (element, text, speed = 100) => {
    if (!element) return;

    let index = 0;
    element.textContent = '';

    const typeChar = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeChar, speed);
      }
    };

    typeChar();
  };

  const addPulseEffect = (element, duration = 2000) => {
    if (!element) return;

    const pulse = () => {
      element.style.transform = 'scale(1.05)';
      element.style.transition = 'transform 0.5s ease';
      
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 500);
    };

    const interval = setInterval(pulse, duration);

    return () => {
      clearInterval(interval);
    };
  };

  return {
    elementRef,
    addHoverEffect,
    addClickEffect,
    addScrollEffect,
    addParallaxEffect,
    addTypingEffect,
    addPulseEffect
  };
};

export default useEnhancedEffects; 