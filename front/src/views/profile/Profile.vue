<script setup>
import { onMounted, ref, reactive } from 'vue'
import { server } from '@/api/index.js'
import { useAuthStore } from '@/stores/auth.js'

const auth = useAuthStore().user

const user = reactive({
    photo: '',
    name: '',
    alias: '',
    addr: '',
    addrDetail: '',
    gitHub: '',
    blog: '',
    email: '',
    shortIntro: '',
    longIntro: '',
    mainContent: [],
})

const userForm = reactive({ ...user })
const isEditing = ref(false)

const toggleEdit = () => {
    isEditing.value = !isEditing.value
}

const saveChanges = () => {
    Object.assign(user, userForm)
    console.log('Saved user info:', user)
    isEditing.value = false
}

const cancelEdit = () => {
    Object.assign(userForm, user)
    isEditing.value = false
}

const imageChage = () => {
    // 이미지 업로드 and 이전 이미지 삭제 로직 필요.
}

onMounted(() => {
    server.get(`/api/name/${auth.alias}`).then(result => {
        let authInfo = result.data.profile

        console.log(authInfo)
        user.photo = `/static/profile/${authInfo.image}`
        user.name = authInfo.name
        user.alias = authInfo.alias
        user.addr = authInfo.addr
        user.addrDetail = authInfo.addr
        user.gitHub = authInfo.gitHub
        user.blog = authInfo.blog
        user.email = authInfo.email
        user.shortIntro = authInfo.simpleIntroduceMyself
        user.longIntro = authInfo.detailIntroduceMyself
        user.mainContent = authInfo.mainContent.split('||')

        console.log(user.mainContent)

        Object.assign(userForm, user)
    })
})
</script>
<template>
    <q-page class="q-pa-md">
        <q-card>
            <q-card-section>
                <div class="row items-center">
                    <q-avatar size="100px" class="q-mr-md">
                        <img :src="userForm.photo" alt="profileImg" />
                    </q-avatar>
                    <q-input type="file" v-if="isEditing" v-model="userForm.photo" label="프로필 이미지" />
                </div>
            </q-card-section>

            <q-card-section>
                <q-list>
                    <q-item>
                        <q-item-section>
                            <q-item-label v-if="!isEditing">이름</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.name }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.name" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>별명</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.alias }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.alias" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>주소</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.addr }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.addr" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>깃허브 주소</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.gitHub }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.gitHub" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>블로그 주소</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.blog }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.blog" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>이메일</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.email }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.email" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>메인페이지 첫째줄</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.mainContent[0] }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.mainContent[0]" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>메인페이지 둘째줄</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.mainContent[1] }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.mainContent[1]" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>한줄 소개</q-item-label>
                            <q-item-label v-if="!isEditing">{{ user.shortIntro }}</q-item-label>
                            <q-input v-if="isEditing" v-model="userForm.shortIntro" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>상세 소개</q-item-label>
                            <q-editor
                                height="300px"
                                v-if="!isEditing"
                                readonly
                                v-model="user.longIntro"
                                name="contents"
                                :dense="$q.screen.lt.md"
                                :toolbar="[]"
                            />
                            <q-editor
                                height="300px"
                                v-if="isEditing"
                                content-style="fontSize: 1rem"
                                v-model="userForm.longIntro"
                                name="contents"
                                :dense="$q.screen.lt.md"
                                :toolbar="
                                    isEditing
                                        ? [
                                              [
                                                  {
                                                      label: $q.lang.editor.align,
                                                      icon: $q.iconSet.editor.align,
                                                      fixedLabel: true,
                                                      list: 'only-icons',
                                                      options: ['left', 'center', 'right', 'justify'],
                                                  },
                                              ],
                                              ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                                              ['token', 'hr', 'link', 'custom_btn'],
                                              ['print', 'fullscreen'],
                                              [
                                                  {
                                                      label: $q.lang.editor.formatting,
                                                      icon: $q.iconSet.editor.formatting,
                                                      list: 'no-icons',
                                                      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                                                  },
                                                  {
                                                      label: $q.lang.editor.fontSize,
                                                      icon: $q.iconSet.editor.fontSize,
                                                      fixedLabel: true,
                                                      fixedIcon: true,
                                                      list: 'no-icons',
                                                      options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
                                                  },
                                                  {
                                                      label: $q.lang.editor.defaultFont,
                                                      icon: $q.iconSet.editor.font,
                                                      fixedIcon: true,
                                                      list: 'no-icons',
                                                      options: [
                                                          'default_font',
                                                          'arial',
                                                          'arial_black',
                                                          'comic_sans',
                                                          'courier_new',
                                                          'impact',
                                                          'lucida_grande',
                                                          'times_new_roman',
                                                          'verdana',
                                                      ],
                                                  },
                                                  'removeFormat',
                                              ],
                                              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                                              ['undo', 'redo'],
                                              ['viewsource'],
                                          ]
                                        : []
                                "
                                :fonts="{
                                    arial: 'Arial',
                                    arial_black: 'Arial Black',
                                    comic_sans: 'Comic Sans MS',
                                    courier_new: 'Courier New',
                                    impact: 'Impact',
                                    lucida_grande: 'Lucida Grande',
                                    times_new_roman: 'Times New Roman',
                                    verdana: 'Verdana',
                                }"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn v-if="!isEditing" color="primary" label="수정" @click="toggleEdit" />
                <q-btn v-if="isEditing" color="primary" label="저장" @click="saveChanges" />
                <q-btn v-if="isEditing" color="secondary" label="취소" @click="cancelEdit" />
            </q-card-actions>
        </q-card>
    </q-page>
</template>
<style scoped>
.q-card {
    margin: auto;
}
.q-item-section {
    display: flex;
    align-items: center;
}
.q-item-label {
    flex: 1;
}
.q-input {
    flex: 2;
}
</style>
