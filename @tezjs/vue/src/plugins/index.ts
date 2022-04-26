import TezSlot from "../components/tez-slot"
import { componentState } from '../const/component-state';
import TzTickedMixin from '../mixins/tz-ticked.mixin'
import store from '../store';
export const tez:
{
    components:(components:Record<string, () => Promise<{
        [key: string]: any;
      }>>)=> any 
  } = new (class {
  components(components:Record<string, () => Promise<{
    [key: string]: any;
  }>>){
    componentState.componentPath(components)
    return {
      install (Vue:any) {
        Vue.component("TezSlot", TezSlot)
        Vue.mixin(TzTickedMixin)
        Vue.use(store)
      }
    }
  }
})