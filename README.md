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
#### 기본 SELECT문
```
select 필드명 or * from 테이블명;
=>테이블 데이터 확인
```

##### 날짜 관련 SELECT문
```
select current_date;
=> 현재날짜 확인 

SELECT CURDATE();
=> 현재날짜 확인

SELECT NOW();
=> 현재날짜와 시간 확인

SELECT NAME, birth, CURDATE(), TIMESTAMPDIFF(YEAR, birth, CURDATE()) AS age FROM pet;
=> timestampdiff(비교할기준, 비교할데이터1, 비교할데이터2)
=> 두 날짜의 차이를 비교하기 위한 함수
=> 비교할 기준 : year, month, day ...

SELECT LAST_DAY('해당날짜');
=> 해당날짜의 마지막 날 조회

SELECT MONTH(특정날짜 및 필드값) FROM 테이블명;
=> 해당 필드값의 월을 가져오는 함수
=> year, day, weekday(요일(0~6으로 표현)), dayofweek(1~7로 표현) 등도 사용가능
```

#### 정렬 관련 SELECT문
```
select name, birth from pet order by birth;
=> 생년월일을 오름차순으로 정렬하여 표현
=> order by 뒤에 복수의 필드라면 앞에 것을 적용하고 뒤에 것을 적용함
```

#### 조건 관련 SELECT문
```
select 필드명 from 테이블명 where 조건식;
=> 검색조건 주고 데이터확인
=> <, >, =(db에서는 같다가 =하나임), >=, <=, and, or, not

select *, sal+ifnull(comm, 0) from emp;
=> ifnull(검사하고자 하는 필드, 필드값이 널이 아닐때 대체값)
=> 만약 comm 필드의 값이 null이라면 0을 넣고 계산

select * from 테이블 where 필드명 is null(is not null);
=> 필드값이 null값인 것(아닌것) 조회
=> null값에 대해서는 =를 사용할 수 없음

select * from 테이블 where 필드명 like 'a%'
=> 필드명이 a로 시작하는 것 조회
=> %는 여러글자를 대체,  _는 한글자를 대체함 

select distinct owner from pet;
=> 중복을 제거한 주인 목록 확인
=> 만약 distinct 뒤에 복수의 필드라면 두 개의 데이터를 모두가 다른것만 출력한다.
=> 서브쿼리 차원에서 많이 사용
```
ex) select distinct name, species from pet;
|이름|종류|
|:---:|:---:|
|lee|dog|
|lee|cat|

=> (lee, dog) 데이터와 (lee, cat)은 두개의 데이터 모두가 다르지 않기 때문에 모두 출력됨

#### 내장 함수 SELECT문
```
select version();
=> 버전확인

select sin(30);, select pi();, select (4+3)*2; ...
=> 수학함수 사용

select user():
=> user 데이터 확인

SELECT empno, ename, CONCAT('연 봉', ' ',sal * 12 ) AS 연봉  FROM emp;
=> 문자열이나 필드를 연결하기 위해서는 concat 사용

select count(*) as cnt from member where userid= 1;
=> userid 값이 1인 값을 cnt라는 필드이름으로 갯수 세기

SELECT COUNT(*) FROM employees WHERE gender = 'f' AND (YEAR(hire_date) = 1987 OR YEAR(hire_date) = 1989);
SELECT COUNT(*) FROM employees WHERE gender = 'f' AND (substring(hire_date, 1, 4) = 1987 OR substring(hire_date,1,4) = 1989);
=> 위아래 쿼리는 같은 결과를 냄
=> substring함수는 첫번째 인자로 값, 두번째인자로 시작 위치, 세번째인자로 잘라 낼 갯수를 의미
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

#### UPDATE
```
update 테이블 set 필드네임1='데이터1', 필드네임2='데이터2' where 조건= 값;
=> 특정 데이터 값 수정
```

#### DELETE
```
delete from 테이블 where id=${id}
=> 특정 데이터 삭제
=> where 없을 시 모든 데이터 삭제
```

## Ajax

- 일반적으로 form태그는 form태그로 쌓여진 모든 데이터를 서버로 보내는 구조
- 비동기적으로 문서의 일부분만 서버로 가서 응답을 받아오는 구조

### Ajax 특징

- 웹페이지가 모두 로드된 후에 서버로부터 데이터 읽어올 수 있음
- 페이지를 재로딩하지 않고 웹페이지 업데이트 기능
- 백그라운드로 서버에 정보를 전송할 수 있다.

```
function loadDoc() {
    //통신용 객체
    const xhttp = new XMLHttpRequest(); 
    
    //서버하고 통식을 하면 계속적으로 상태가 바뀔 때 마다 어떤 상태다 라는 정보를 계속 보내준다.
    //통신상에서 어떤 일이 있을때마다 이곳에 전달된 함수를 계속 호출해준다(callback)
    xhttp.onreadystatechange = function() {
        
        //this -> http 객체
        //readyState -> 현재 통신 상태에 대한 정보값
        //status -> 데이터가 제대로 수신되었는지에 관한 코드
        //responseText -> 데이터 받아오기
        if( this.readyState === 4 && this.status === 200){
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };

    //서버에 데이터를 요청
    //통신방식, url, true-비동기
    xhttp.open("GET", "/member/idcheck", true);
    xhttp.send();
}
```