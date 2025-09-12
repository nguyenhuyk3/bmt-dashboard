import { call, put, takeLatest, all } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./authenticationSlice";
import authenticationApi from "../../api/authenticationApi";

/*
    Trong Redux-Saga, effect giống như “hướng dẫn” cho middleware saga phải làm gì.
    
    call là gì?
        -> Trong Redux-Saga, call là một effect creator. Nó tạo ra một mô tả (description) 
        cho middleware saga biết rằng cần phải gọi một hàm bất đồng bộ (API, Promise, async function...) 
        và đợi kết quả trước khi chạy tiếp.
    Cú pháp -> call(fn, ...args):
        - fn: hàm bạn muốn gọi (có thể là async function hoặc trả về Promise).
        - ...args: tham số truyền vào hàm đó.
        - Kết quả trả về sẽ được gán vào biến khi saga tiếp tục.
    
    put(action):
        - Dispatch một action vào store Redux.
        - Tương tự như dispatch(action).
    
    takeLatest là gì?
        -> takeLatest là một effect helper trong Redux-Saga, dùng để lắng nghe một action nào đó.
        Khi action đó được dispatch nhiều lần liên tục -> nó sẽ chỉ chạy saga cho action 
        cuối cùng và hủy bỏ saga đang chạy trước đó.
    Cú pháp -> takeLatest(pattern, saga):
        - actionType: tên action muốn theo dõi (ví dụ loginRequest.type).
        - sagaFunction: hàm generator sẽ chạy khi action dispatch.
        - Nếu nhiều action loginRequest được dispatch liên tục, 
        takeLatest sẽ hủy bỏ saga trước đó và chỉ giữ lại lần cuối (tránh gọi API login liên tục).
    
    all là gì?
        -> all là một effect combinator trong redux-saga, dùng để chạy nhiều saga đồng thời (song song).
        Nó nhận vào một mảng các effect và thực thi chúng cùng lúc.
    Cú pháp -> all([...sagas]):
        - Nếu một saga bị lỗi (throw error), thì all cũng sẽ throw error ra ngoài (trừ khi bạn có try/catch).    
        - Chạy nhiều saga song song.
        - Dùng cho rootSaga để gom nhiều watcher lại.
*/

function* handleLogin(action) {
    try {
        const { email, password } = action.payload;
        const response = yield call(authenticationApi.login, { email, password });

        if (response.role === "CUSTOMER") {
            yield put(loginFailure("Tài khoản không hợp lệ"));
        } else {
            yield put(loginSuccess(response));
        }
    } catch {
        yield put(loginFailure("Đăng nhập thất bại!!"));
    }
}

// Saga watcher
function* watchLogin() {
    yield takeLatest(loginRequest.type, handleLogin);
}

export default function* rootSaga() {
    yield all([watchLogin()]);
}