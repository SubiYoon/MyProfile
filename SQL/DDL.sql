create database myself
    with owner profile;

create schema introduce;

alter schema introduce owner to profile;

create table introduce.my_profile
(
    name                    varchar not null
        constraint my_profile_pk
            primary key,
    password                varchar not null,
    birth_year              integer,
    sex                     varchar,
    addr                    varchar,
    addr_detail             varchar,
    simple_introduce_myself varchar,
    detail_introduce_myself varchar,
    image                   varchar,
    regist_ts               date,
    update_ts               date
);

comment on table introduce.my_profile is '프로필';

comment on column introduce.my_profile.name is '이름';

comment on column introduce.my_profile.password is '비밀번호';

comment on column introduce.my_profile.birth_year is '출생년도';

comment on column introduce.my_profile.sex is '성별';

comment on column introduce.my_profile.addr is '주소';

comment on column introduce.my_profile.addr_detail is '주소상세';

comment on column introduce.my_profile.simple_introduce_myself is '한줄자기소개';

comment on column introduce.my_profile.detail_introduce_myself is '상세자기소개';

comment on column introduce.my_profile.image is '증명사진';

alter table introduce.my_profile
    owner to profile;


-- 경력
create table introduce.career
(
    carrer_seq   integer not null
        constraint career_pk
            primary key,
    name        varchar not null,
    company      varchar not null,
    company_url  varchar,
    company_logo varchar,
    "in"         date    not null,
    in_level     varchar not null,
    out          date,
    out_level    varchar,
    regist_ts    date default now(),
    update_ts    date
);

comment on table introduce.career is '경력';

comment on column introduce.career.carrer_seq is '일련번호';

comment on column introduce.career.name is '이름';

comment on column introduce.career.company is '회사명';

comment on column introduce.career.company_url is '회사 홈페이지';

comment on column introduce.career.company_logo is '회사_로고';

comment on column introduce.career."in" is '입사년월일';

comment on column introduce.career.in_level is '입사 직책';

comment on column introduce.career.out is '퇴사년월일';

comment on column introduce.career.out_level is '퇴사 직전 직책';

comment on column introduce.career.update_ts is '수정';

alter table introduce.career
    owner to profile;

-- 프로젝트
create table introduce.project
(
    project_seq        integer not null
        constraint project_pk
            primary key,
    name               varchar not null,
    career_seq         integer not null,
    project_name       varchar,
    project_term       integer,
    project_contribute varchar,
    regist_ts          date default now(),
    update_ts          date
);

comment on table introduce.project is '프로젝트';

comment on column introduce.project.career_seq is '경력_일련번호';

comment on column introduce.project.name is '이름';

comment on column introduce.project.project_seq is '일련번호';

comment on column introduce.project.project_name is '프로젝트_이름';

comment on column introduce.project.project_term is '프로젝트_기간';

comment on column introduce.project.project_contribute is '프로젝트_기여도';

alter table introduce.project
    owner to profile;

-- 프로젝트 상세
create table introduce.project_detail
(
    project_detail_seq integer not null
        constraint project_detail_pk
            primary key,
    name               varchar not null,
    project_seq        integer,
    detail_act_title   varchar,
    detail_act_cont    varchar,
    detail_act_term    integer,
    regist_ts          date default now(),
    update_ts          date
);

comment on table introduce.project_detail is '프로젝트_상세';

comment on column introduce.project_detail.project_detail_seq is '프로젝트_상세_일련번호';

comment on column introduce.project_detail.name is '이름';

comment on column introduce.project_detail.project_seq is '프로젝트_일련번호';

comment on column introduce.project_detail.detail_act_title is '상세_실시_항목';

comment on column introduce.project_detail.detail_act_cont is '상세_실시_내용';

comment on column introduce.project_detail.detail_act_term is '상세_실시_기간';

alter table introduce.project_detail
    owner to profile;

-- 프로젝트 스택
create table introduce.project_stack
(
    project_stack_seq integer not null
        constraint project_stack_pk
            primary key,
    name              varchar not null,
    project_seq       integer,
    stack_kind        varchar,
    stack_img         varchar,
    regist_ts         date default now(),
    update_ts         date
);

comment on table introduce.project_stack is '프로젝트 스택';

comment on column introduce.project_stack.project_stack_seq is '프로젝트_스택_일련번호';

comment on column introduce.project_stack.name is '이름';

comment on column introduce.project_stack.project_seq is '프로젝트_일련번호';

comment on column introduce.project_stack.stack_kind is '스택_종류';

comment on column introduce.project_stack.stack_img is '스택_이미지';

alter table introduce.project_stack
    owner to profile;

-- 내가 사용 가능한 스택
create table introduce.my_stack
(
    stack_seq   integer not null
        constraint my_stack_pk
            primary key,
    name        varchar not null,
    stack_name  varchar,
    stack_level varchar,
    stack_img   varchar,
    regist_ts   date default now(),
    update_ts   date
);

comment on table introduce.my_stack is '나의_스택';

comment on column introduce.my_stack.stack_seq is '스택_일련번호';

comment on column introduce.my_stack.name is '이름';

comment on column introduce.my_stack.stack_name is '스택_이름';

comment on column introduce.my_stack.stack_level is '스택_숙련도';

comment on column introduce.my_stack.stack_img is '스택_이미지';

alter table introduce.my_stack
    owner to profile;

create table introduce.menu
(
    menu_seq   integer not null
        constraint menu_pk
            primary key,
    menu_name        varchar not null,
    regist_ts   date default now(),
    update_ts   date
);

comment on table introduce.menu is '메뉴';

comment on column introduce.menu.menu_seq is '메뉴_일련번호';

comment on column introduce.menu.menu_name is '메뉴_이름';

alter table introduce.menu
    owner to profile;

ALTER USER profile SET search_path = introduce,public;

commit;
