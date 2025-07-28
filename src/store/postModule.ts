import type {Module} from "vuex";
import axios from "axios";

export interface Post{
    id: number;
    title: string;
    body: string;
}

export interface PostState{
    posts: Post[],
    isPostLoading: boolean,
    selectedSort: string,
    searchQuery: string,
    page: number,
    limit: number,
    totalPages: number
}

export const postModule: Module<PostState, any> = {
    namespaced: true,

    state: () => ({
        posts: [],
        isPostLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0
    }),

    mutations: {
        setPosts(state, posts: Post[]){
            state.posts = posts
        },
        setLoading(state, loading: boolean){
            state.isPostLoading = loading
        },
        setSelectedSort(state, selectedSort: string){
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery: string){
            state.searchQuery = searchQuery
        },
        setPage(state, page: number){
            state.page = page
        },
        setLimit(state, limit: number){
            state.limit = limit
        },
        setTotalPages(state, totalPages: number){
            state.totalPages = totalPages
        },
        addPost(state, post: Post){
            state.posts.push(post)
        },
        removePost(state, postId: number){
            state.posts = state.posts.filter(post => post.id !== postId)
        }
    },

    actions: {
        async fetchPosts({commit, state}){
            commit('setLoading', true)
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setPosts', response.data)
                const total = parseInt(response.headers['x-total-count'] || '0')
                commit('setTotalPages', Math.ceil(total / state.limit))
                commit('setLoading', false)
            }
            catch (e) {
                alert(e)
            } finally {
            }
        }
    },

    getters: {
        sortedPosts(state): Post[] {
            if (!state.selectedSort) return state.posts
            return [...state.posts].sort((a, b) =>
                a[state.selectedSort as keyof Post].toString().localeCompare(
                    b[state.selectedSort as keyof Post].toString()
                )
            )
        },
        sortedAndSearchedPosts(state, getters): Post[] {
            return getters.sortedPosts.filter((post: Post) =>
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            )
        }
    }
}