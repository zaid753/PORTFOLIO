import { useInView } from 'react-intersection-observer';

export function useScrollReveal() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return { ref, inView };
}
