create table yoon_dong_sup
(
    name                    varchar not null
        constraint yoon_dong_sup_pk
            primary key,
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

comment on table yoon_dong_sup is '윤동섭';

comment on column yoon_dong_sup.name is '이름';

comment on column yoon_dong_sup.birth_year is '출생년도';

comment on column yoon_dong_sup.sex is '성별';

comment on column yoon_dong_sup.addr is '주소';

comment on column yoon_dong_sup.addr_detail is '주소상세';

comment on column yoon_dong_sup.simple_introduce_myself is '한줄자기소개';

comment on column yoon_dong_sup.detail_introduce_myself is '상세자기소개';

comment on column yoon_dong_sup.image is '증명사진';

alter table yoon_dong_sup
    owner to root;


-- 경력
create table abcd.career
(
    carrer_seq         integer not null
        constraint career_pk
            primary key,
    company     varchar not null,
    company_url varchar,
    company_logo varchar,
    "in"        date    not null,
    in_level    varchar not null,
    out         date,
    out_level   varchar,
    regist_ts   date default now(),
    update_ts   date
);

comment on table abcd.career is '경력';

comment on column abcd.career.carrer_seq is '일련번호';

comment on column abcd.career.company is '회사명';

comment on column abcd.career.company_url is '회사 홈페이지';

comment on column abcd.career.company_logo is '회사_로고';

comment on column abcd.career."in" is '입사년월일';

comment on column abcd.career.in_level is '입사 직책';

comment on column abcd.career.out is '퇴사년월일';

comment on column abcd.career.out_level is '퇴사 직전 직책';

comment on column abcd.career.update_ts is '수정';

alter table abcd.career
    owner to root;

-- 프로젝트
create table abcd.project
(
    project_seq  integer not null
        constraint project_pk
            primary key,
    career_seq   integer not null,
    project_name varchar,
    project_term integer,
    project_contribute varchar,
    regist_ts   date default now(),
    update_ts   date
);

comment on table abcd.project is '프로젝트';

comment on column abcd.project.career_seq is '경력_일련번호';

comment on column abcd.project.project_seq is '일련번호';

comment on column abcd.project.project_name is '프로젝트_이름';

comment on column abcd.project.project_term is '프로젝트_기간';

comment on column abcd.project.project_contribute is '프로젝트_기여도';

alter table abcd.project
    owner to root;

-- 프로젝트 상세
create table abcd.project_detail
(
    project_detail_seq integer not null
        constraint project_detail_pk
            primary key,
    project_seq        integer,
    detail_act_title   varchar,
    detail_act_cont    varchar,
    detail_act_term    integer,
    regist_ts   date default now(),
    update_ts   date
);

comment on table abcd.project_detail is '프로젝트_상세';

comment on column abcd.project_detail.project_detail_seq is '프로젝트_상세_일련번호';

comment on column abcd.project_detail.project_seq is '프로젝트_일련번호';

comment on column abcd.project_detail.detail_act_title is '상세_실시_항목';

comment on column abcd.project_detail.detail_act_cont is '상세_실시_내용';

comment on column abcd.project_detail.detail_act_term is '상세_실시_기간';

alter table abcd.project_detail
    owner to root;

-- 프로젝트 스택
create table abcd.project_stack
(
    project_stack_seq integer not null
        constraint project_stack_pk
            primary key,
    project_seq       integer,
    stack_kind        varchar,
    stack_img         varchar,
    regist_ts   date default now(),
    update_ts   date
);

comment on table abcd.project_stack is '프로젝트 스택';

comment on column abcd.project_stack.project_stack_seq is '프로젝트_스택_일련번호';

comment on column abcd.project_stack.project_seq is '프로젝트_일련번호';

comment on column abcd.project_stack.stack_kind is '스택_종류';

comment on column abcd.project_stack.stack_img is '스택_이미지';

alter table abcd.project_stack
    owner to root;

-- 내가 사용 가능한 스택
create table abcd.my_stack
(
    stack_seq integer not null
        constraint my_stack_pk
            primary key,
    stack_name varchar,
    stack_level varchar,
    stack_img varchar,
    regist_ts date default now(),
    update_ts date
);

comment on table abcd.my_stack is '나의_스택';

comment on column abcd.my_stack.stack_seq is '스택_일련번호';

comment on column abcd.my_stack.stack_name is '스택_이름';

comment on column abcd.my_stack.stack_level is '스택_숙련도';

comment on column abcd.my_stack.stack_img is '스택_이미지';

alter table abcd.my_stack
    owner to root;


