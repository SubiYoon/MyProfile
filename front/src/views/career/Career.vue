<script setup>
import { onMounted, reactive, ref } from 'vue'
import { $alert } from '@/ui/notify.js'
import { server } from '@/api/index.js'
import { useAuthStore } from '@/stores/auth.js'

const auth = useAuthStore().user
let careers = reactive([])
const career = reactive({
    company: '',
    companyUrl: '',
    companyLogo: '',
    in: '',
    inLevel: '',
    out: '',
    outLevel: '',
})
const careerForm = reactive({ ...career })
const isEditing = ref(false)

const toggleEdit = () => {
    isEditing.value = !isEditing.value
}

const saveChanges = () => {
    Object.assign(career, careerForm)
    isEditing.value = false
}
const cancelEdit = () => {
    Object.assign(careerForm, career)
    isEditing.value = false
}

const imageChage = () => {
    if (career.companyLogo.size > 10240000) {
        $alert('업로드 최대 사이즈는 10MB입니다.\r\n다른 이미지를 선택해주세요.')
    } else {
        server
            .put(
                `/api/career/${auth.alias}/profileImage`,
                { profileImage: career.companyLogo },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            .then(result => {
                if (result.data.image) {
                    careerForm.photo = `/static/images/career/${auth.alias}/${result.data.companyLogo}?v2`
                }
            })
            .catch(error => {
                $alert(error.message)
            })
    }
}

onMounted(() => {
    server.get(`/api/career/${auth.alias}`).then(result => {
        careers = result.data.carrers
        console.log(careers)
    })
})
</script>

<template>
    <q-page class="q-pa-md">
        <q-card>
            <q-card-section>
                <div class="row items-center">
                    <q-avatar size="100px" class="q-mr-md">
                        <q-img :src="careerForm.photo" />
                    </q-avatar>
                    <q-file type="file" v-if="isEditing" v-model="career.companyLogo" label="회사 로고" @update:model-value="imageChage" />
                </div>
            </q-card-section>
            <q-card-section>
                <q-list>
                    <q-item>
                        <q-item-section>
                            <q-item-label></q-item-label>
                            <q-item-label v-if="!isEditing">{{ career.company }}</q-item-label>
                            <q-input v-if="isEditing" v-model="careerForm.company" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>회사 홈페이지</q-item-label>
                            <q-item-label v-if="!isEditing">{{ career.companyUrl }}</q-item-label>
                            <q-input v-if="isEditing" v-model="careerForm.companyUrl" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>입사일</q-item-label>
                            <q-item-label v-if="!isEditing">{{ career.addr }}</q-item-label>
                            <q-input v-if="isEditing" v-model="careerForm.addr" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>퇴사일</q-item-label>
                            <q-item-label v-if="!isEditing">{{ career.addrDetail }}</q-item-label>
                            <q-input v-if="isEditing" v-model="careerForm.addrDetail" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>입사 직함</q-item-label>
                            <q-item-label v-if="!isEditing">{{ career.gitHub }}</q-item-label>
                            <q-input v-if="isEditing" v-model="careerForm.gitHub" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-item-label>퇴사 직함</q-item-label>
                            <q-item-label v-if="!isEditing">{{ career.blog }}</q-item-label>
                            <q-input v-if="isEditing" v-model="careerForm.blog" />
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
