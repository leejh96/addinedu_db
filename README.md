# 데이터베이스

- 대량의 데이터 저장소
    - 일관성 : 데이터를 파일로 저장하게 되어 특정 파일에 실수로 데이터를 고치지 못했을 경우 일관성이 깨졌다고 할 수 있음
    - 무결성

## 환경변수 설정하기
- 환경변수 : OS마다 변수가 있는데 이 변수에 값을 넣고 이 값을 읽어서 쓸 수 있음
    - mariadb를 실행하기 위해서는 해당폴더를 직접 cd명령어로 찾아야하지만 path변수에 해당경로를 넣어주면 직접 찾아가지 않고 실행 가능

## 관계형 데이터베이스

- 각각의 정보를 테이블이라는 형태로 저장하고 각각의 테이블과 테이블을 서로 관계를 맺어서 중복성을 배제하고 일관성, 무결성을 유지하기 위해서 서로 제약을 가함 => DBMS를 만듦 Ex) 오라클, MySQL, MSSQL, TIBRO, CUBRID ...

- 모델링 : 현실세계를 시뮬레이션
    - 데이터베이스 안에 테이블 생성
    - 테이블은 행과 열로 구성되어 있고 각 열은 필드 각 행은 레코드
    - 1:N의 관계 : 테이블 반드시 분리
    - 1:1의 관계 : 각 DBMS마다 테이블에 허용 필드 갯수가 있기 때문에 테이블을 분리
    - M:N의 관계 : 앞의 테이블의 M개 데이터와 N개의 데이터가 관계있을 때

- 제약조건 : primary key, foreign key
    - primary key(기본키) : 어떤 필드의 값이 중복되거나 NULL값이 들어오지 못하게 함
        - 한 테이블에 하나의 primary key를 지정 가능
        - primary key는 여러개의 필드를 묶어서 지정도 가능함
        - 동일한 테이블 내에서 데이터 중복을 막음
        - 데이터가 중복되면 primary key 오류가 발생
        - ex) 주민등록번호, 사원번호, 학번 ...

    - foreign key(외부키) : 테이블과 테이블 사이에서 서로 제약
        - 메모리 적게차지
        - 데이터 업데이트 쉬움 => 일관성 유지

### MySQL 자료형
- int : 정수형 데이터 자료형
- varchar : **var**iant **char**로 가변길이 문자열, 크기가 최대크기를 의미하고 실제 데이터 만큼의 크기만 갖고있음
- char : 고정길이 문자열, 정해진 자리수만큼 자리를 차지
- null : 데이터를 정의할 수 없음, 연산 불가능

### MySQL 테이블 명령어
- 명령어 입력 시 대소문자 구별하지 않음
- 문자열 입력 시 ''만 사용 "" 사용x
- 데이터 입력시에도 대소문자 구별하지 않음
    - ex) where = 'smith' where='SMITH' 같은 것

#### SHOW
```
show databases;
=> 데이터베이스 확인하기

show tables
=> 테이블 확인하기

desc 테이블명;
=> 테이블 구조확인
```


#### SELECT
```
select 필드명 or * from 테이블명;
=>테이블 데이터 확인

select 필드명 from 테이블명 where 조건식;
=> 검색조건 주고 데이터확인
=> <, >, =(db에서는 같다가 =하나임), >=, <=, and, or, not

select version();
=> 버전확인

select current_date;
=> 현재날짜 확인 

select sin(30);, select pi(), select (4+3)*2; ...
=> 수학함수 사용

select now();
=> 현재시간과 날짜 확인 

select user():
=> user 데이터 확인

select *, sal+ifnull(comm, 0) from emp;
=> ifnull(검사하고자 하는 필드, 필드값이 널이 아닐때 대체값)
=> 만약 comm 필드의 값이 null이라면 0을 넣고 계산

select distinct owner from pet;
=> 중복을 제거한 주인 목록 확인
=> 만약 distinct 뒤에 복수의 필드라면 두 개의 데이터를 모두가 다른것만 출력한다.
=> 서브쿼리 차원에서 많이 사용

ex) select distinct name, species from pet;
|이름|종류|
|:---:|:---:|
|lee|dog|
|lee|cat|
=>(lee, dog) 데이터와 (lee, cat)은 두개의 데이터 모두가 다르지 않기 때문에 모두 출력됨

select name, birth from pet order by birth;
=> 생년월일을 오름차순으로 정렬하여 표현
=> order by 뒤에 복수의 필드라면 앞에 것을 적용하고 뒤에 것을 적용함
```

#### CREATE
```
create table board(
    id int,
    title varchar(10),
    writer varchar(10),
    contents varchar(30),
    wdate date
);
=> 테이블 생성

```

#### INSERT
```
insert into board values(1, '게시글1', '내용1', '작성자1', now());
=> 테이블 데이터 넣기
=> 만든 테이블의 필드 순서를 맞춰야 한다.
```

