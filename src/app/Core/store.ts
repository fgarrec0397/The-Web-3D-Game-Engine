import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
    Store,
    createStore,
    combineReducers,
    ReducersMapObject,
    Reducer,
    applyMiddleware,
    AnyAction,
} from "redux";
import thunk from "redux-thunk";
import featuresReducer, { FeaturesState } from "../../Features/featuresReducer";
import editorReducer, { EditorState } from "../Editor/state/editorReducer";

interface State {
    editor: EditorState;
    features: FeaturesState;
}

type MyAction = AnyAction;

export type InjectableStore = Store<State, MyAction> & {
    injectReducer?: (featuresReducer: Reducer<FeaturesState, MyAction>) => void;
    asyncReducers?: Partial<ReducersMapObject<State, MyAction>>;
};

// const featuresReducer = (state: FeaturesState = {}, action: MyAction): FeaturesState => state;

/**
 * mapping of State properties to their reducers
 */
const staticReducers: ReducersMapObject<State, MyAction> = {
    editor: editorReducer,
    features: featuresReducer,
};

/**
 * Create a store which has a function to inject a pageReducer
 */
const initStore = (): InjectableStore => {
    const store: InjectableStore = createStore(createReducer(), applyMiddleware(thunk));

    store.asyncReducers = {};
    store.injectReducer = (asyncReducer: Reducer<FeaturesState, MyAction>) => {
        store.asyncReducers = {
            ...store.asyncReducers,
            features: asyncReducer,
        };
        store.replaceReducer(createReducer(store.asyncReducers));
    };

    return store;
};

export const store = initStore();

/**
 * combines the original static reducers with all of the reducer overrides
 */
function createReducer(asyncReducers: Partial<ReducersMapObject<State, MyAction>> = {}) {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    });
}

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
