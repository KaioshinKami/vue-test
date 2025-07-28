import {createStore} from "vuex";
import {postModule} from "./postModule.ts";

export default createStore({
    modules: {
        post: postModule
    }
})