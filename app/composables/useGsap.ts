import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsap() {
  const ctx = ref<gsap.Context | null>(null);

  const createContext = (scope: Element | string) => {
    ctx.value = gsap.context(() => {}, scope);
    return ctx.value;
  };

  onUnmounted(() => {
    ctx.value?.revert();
  });

  return {
    gsap,
    ScrollTrigger,
    createContext,
  };
}
