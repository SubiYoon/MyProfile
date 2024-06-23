import { Dialog, Notify } from 'quasar'
import NotiDialog from './components/NotiDialog.vue'
import _ from 'lodash'

export const NotifyPlugin = {
    install: (app, options) => {
        window.$alert = $alert
        app.provide('$alert', $alert)
        app.config.globalProperties.$alert = $alert

        window.$info = $info
        app.provide('$info', $info)
        app.config.globalProperties.$info = $info

        window.$confirm = $confirm
        app.provide('$confirm', $confirm)
        app.config.globalProperties.$confirm = $confirm
    },
}

/**
 * 알림, 확인버튼을 클릭해야 사라짐
 *
 * @param message 메시지내용
 * @param caption 제목
 * @param icon 아이콘
 * @param label
 * @param html html내용
 */
export function $alert({ message, caption, icon = 'alert', label = '확인', html }) {
    if (arguments.length > 0 && _.isString(arguments[0])) {
        message = arguments[0]
    }
    let before = document.activeElement //현재포커스
    return new Promise((resolve, reject) => {
        Dialog.create({
            component: NotiDialog,
            componentProps: {
                message,
                html,
                icon,
                caption,
                persistent: true,
                ok: label,
            },
            position: 'standard',
        })
            .onOk(resolve)
            .onDismiss(e =>
                //창 닫힐때 원래위치로 포커스를 돌려준다.
                before.focus(),
            )
    })
}

/**
 * 정보, 자동으로 사라지는 메시지
 *
 * @param message 메시지내용
 * @param caption 제목
 * @param icon 아이콘
 */
export function $info({ message, caption, icon = 'info' }) {
    if (arguments.length > 0 && _.isString(arguments[0])) {
        message = arguments[0]
    }
    return new Promise(resolve => {
        Notify.create({
            message,
            caption,
            icon,
        })
        resolve()
    })
}

/**
 * 확인
 *
 * "확인","취소" 버튼이 제공되는 모달
 *
 * @param message 메시지내용
 * @param caption 제목
 * @param icon 아이콘
 * @param okLabel 확인버튼라벨
 * @param cancelLabel 취소버튼라벨
 */
export function $confirm({ message, caption, icon = 'help', okLabel = '확인', cancelLabel = '취소' }) {
    if (arguments.length > 0 && _.isString(arguments[0])) {
        message = arguments[0]
    }
    return new Promise((resolve, reject) => {
        Dialog.create({
            component: NotiDialog,
            componentProps: {
                message,
                icon,
                caption,
                persistent: true,
                ok: okLabel,
                cancel: cancelLabel,
                class: 'confirm',
            },
            position: 'standard',
        })
            .onOk(resolve)
            .onCancel(reject)
    })
}
