import { METAMASK } from '~/constants/authConstant';

export const initState = {
    addressAccount: '',
    isAuth: false,
};
export const authReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case METAMASK:
            console.log(payload);
            return {
                ...state,
                addressAccount: payload.addressAccount,
                isAuth: payload.isAuth,
            };
    }
};
