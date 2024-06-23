<template>
    <!-- notice dialogRef here -->
    <q-dialog ref="dialogRef" @hide="onDialogHide" :persistent="persistent" @show="onDialogShow" :class="class" class="style02">
        <q-card class="q-dialog-plugin">
            <!--
              ...content
              ... use q-card-section for it?
            -->
            <q-icon v-if="icon" :name="icon" size="2em"></q-icon>
            <q-bar v-if="caption">
                {{ caption }}
            </q-bar>
            <q-card-section>
                <!--                <textarea ref="viewArea" readonly class="view-area" v-text="message"></textarea>-->
                <div v-if="html" class="msg_list" v-html="html"></div>
                <pre ref="viewArea" v-if="message" v-text="message"></pre>
            </q-card-section>

            <!-- buttons example -->
            <q-card-actions align="center">
                <q-btn class="btn-ok" v-if="ok" :label="ok" @click="onOKClick" />
                <q-btn class="btn-cancel" v-if="cancel" :label="cancel" @click="onCancelClick" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

const focusableElementsSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
export default {
    props: ['message', 'icon', 'caption', 'ok', 'cancel', 'persistent', 'class', 'html'],

    emits: [
        // REQUIRED; need to specify some events that your
        // component will emit through useDialogPluginComponent()
        ...useDialogPluginComponent.emits,
    ],

    setup: function (props) {
        console.log('caption', props.caption)
        // REQUIRED; must be called inside of setup()
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
        // dialogRef      - Vue ref to be applied to QDialog
        // onDialogHide   - Function to be used as handler for @hide on QDialog
        // onDialogOK     - Function to call to settle dialog with "ok" outcome
        //                    example: onDialogOK() - no payload
        //                    example: onDialogOK({ /*.../* }) - with payload
        // onDialogCancel - Function to call to settle dialog with "cancel" outcome
        const viewArea = ref(null)
        const onDialogShow = () => {
            let focusable = dialogRef.value.$el.querySelectorAll(focusableElementsSelector)
            if (focusable.length > 0) {
                focusable[0].focus()
            }

            const area = viewArea.value
            if (!area) {
                return
            }
            area.style.height = area.scrollHeight + 'px'
        }
        return {
            // This is REQUIRED;
            // Need to inject these (from useDialogPluginComponent() call)
            // into the vue scope for the vue html template
            dialogRef,
            onDialogHide,
            onDialogShow,

            // other methods that we used in our vue html template;
            // these are part of our example (so not required)
            onOKClick() {
                // on OK, it is REQUIRED to
                // call onDialogOK (with optional payload)
                onDialogOK(true)
                // or with payload: onDialogOK({ ... })
                // ...and it will also hide the dialog automatically
            },

            // we can passthrough onDialogCancel directly
            onCancelClick: onDialogCancel,
            viewArea,
        }
    },
}
</script>
<style scoped lang="scss">
.view-area {
    padding: 0;
    border: none;
    border-radius: unset;
    color: #000000;
    resize: none;
    width: 90%;
    overflow-y: hidden;
    outline: none;
    height: 46px;
}
.q-dialog {
    .q-dialog-plugin .q-bar {
        display: block;
        height: auto;
        padding: 80px 20px 15px 20px;
        background-color: #fff;
        text-align: center;
        font-size: 20px;
        color: #222;
        + .q-card__section {
            padding: 20px;
        }
    }
    .q-card__section {
        padding: 80px 20px 20px 20px;
        pre {
            margin: 0;
            height: auto !important;
            font-family: 'Noto Sans KR', dotum, '돋움', sans-serif;
            font-size: 14px;
            text-align: center;
            white-space: pre-wrap;
        }
    }
    .q-icon {
        position: absolute;
        left: 50%;
        top: 20px;
        transform: translateX(-50%);
        z-index: 1000;
        padding: 4px;
        border-radius: 50%;
        font-size: 32px !important;
        color: #ffb036;
        &:before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 40px;
            height: 40px;
            border: 3px solid #ffb036;
            border-radius: 50%;
        }
    }
    .q-btn {
        color: #fff;
        &:before {
            box-shadow: none;
        }
        &.btn-ok {
            border-color: #0f3561;
            background-color: #0f3561;
        }
        &.btn-cancel {
            border-color: #585d6d;
            background-color: #585d6d !important;
        }
    }
}
.q-dialog.confirm {
    .q-icon {
        color: #e73838;
        &:before {
            border: 3px solid #e73838;
        }
    }
}
</style>
