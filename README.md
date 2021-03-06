# 데이터베이스

- 대량의 데이터 저장소
    - 일관성 : 데이터를 파일로 저장하게 되어 특정 파일에 실수로 데이터를 고치지 못했을 경우 일관성이 깨졌다고 할 수 있음
    - 무결성 : 한쪽 데이터가 바뀌었을 경우 같은 참조하는 다른 데이터도 함께 바뀌는 성질

- DDL : 테이블 자체를 만들고 수정, 삭제와 관련된 언어
    - Ex) CREATE, ALTER, TRUNCATE, DROP...
- DML : 테이블내의 데이터를 수정하고 삭제하고 추가하고 조회하는 언어
    - Ex) SELECT, INSERT, UPDATE, DELETE

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
    - varchar는 메모리를 효율적으로 사용하긴 하지만 속도가 빠르지는 않음
    - 한번에 많이 줄 경우 단편화가 발생할 수 있음
- char : 고정길이 문자열, 정해진 자리수만큼 자리를 차지
- null : 데이터를 정의할 수 없음, 연산 불가능
- float : 실수형태의 데이터 => 10진수에서 2진수로 변환시 약간의 데이터 손실
- decimal : 실수형태의 데이터 => 10진수에서 2진수로 변환시 데이터 손실x

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
##### 모든 테이블 정보를 보는 SELECT문
- information_schema를 사용 => 딕셔너리
```
use infomation_schema;
SELECT * from tables;
=> 모든 DB에 table 내용 확인

SELECT * FROM table_constraints;
=> 모든 DB table에 제약조건 확인
```

##### 기본 SELECT문
```
SELECT 필드명 or * from 테이블명;
=>테이블 데이터 확인
```

##### 날짜 관련 SELECT문
```
SELECT current_date;
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

SELECT ADDDATE(curdate(), INTERVAL 6 MONTH);
=> 현재 날짜에 6개월 후
=> SUBDATE로 하게 되면 6개월 전

SELECT ADDTIME(CURTIME(), '1:0:0')
=> 현재 시간에 1시간 더하기
=> 1:0:0 (시:분:초)
=> SUBTIME 하면 1시간전
```

##### 정렬 관련 SELECT문
```
SELECT name, birth from pet order by birth;
=> 생년월일을 오름차순으로 정렬하여 표현
=> order by 뒤에 복수의 필드라면 앞에 것을 적용하고 뒤에 것을 적용함
```

##### 조건 관련 SELECT문
```
SELECT 필드명 from 테이블명 where 조건식;
=> 검색조건 주고 데이터확인
=> <, >, =(db에서는 같다가 =하나임), >=, <=, and, or, not

SELECT *, sal+ifnull(comm, 0) from emp;
=> ifnull(검사하고자 하는 필드, 필드값이 널이 아닐때 대체값)
=> 만약 comm 필드의 값이 null이라면 0을 넣고 계산

SELECT * from 테이블 where 필드명 is null(is not null);
=> 필드값이 null값인 것(아닌것) 조회
=> null값에 대해서는 =를 사용할 수 없음

SELECT * from 테이블 where 필드명 like 'a%'
=> 필드명이 a로 시작하는 것 조회
=> %는 여러글자를 대체,  _는 한글자를 대체함 

SELECT distinct owner from pet;
=> 중복을 제거한 주인 목록 확인
=> 만약 distinct 뒤에 복수의 필드라면 두 개의 데이터를 모두가 다른것만 출력한다.
=> 서브쿼리 차원에서 많이 사용
```
ex) SELECT distinct name, species from pet;
|이름|종류|
|:---:|:---:|
|lee|dog|
|lee|cat|

=> (lee, dog) 데이터와 (lee, cat)은 두개의 데이터 모두가 다르지 않기 때문에 모두 출력됨

##### 그룹함수
- count, sum, max, min 
- 전체 데이터를 대상으로 합계 구하기

###### count
```
SELECT count(*) as cnt from member where userid= 1;
=> userid 값이 1인 값을 cnt라는 필드이름으로 갯수 세기
=> *에는 필드명이 들어갈 수 있고 갯수를 셀 때 NULL값은 제외하고 센다.
```

###### sum
```
SELECT sum(price) from buytbl;
=> 가격의 합 계산
```

###### max
```
SELECT max(price) from buytbl;
=> 가격 최대값 계산
```

###### min
```
SELECT min(price) from buytbl;
=> 가격 최솟값 계산
```

###### GROUP BY
```
SELECT userid, COUNT(*) FROM buytbl
GROUP BY userid;
```

##### 내장 함수 SELECT문
```
SELECT version();
=> 버전확인

SELECT sin(30);, SELECT pi();, SELECT (4+3)*2; ...
=> 수학함수 사용

SELECT user():
=> user 데이터 확인

SELECT empno, ename, CONCAT('연 봉', ' ',sal * 12 ) AS 연봉  FROM emp;
=> 문자열이나 필드를 연결하기 위해서는 concat 사용

SELECT CONCAT('-','2021','11','11' ); -- 2021-11-11
=> 문자열 사이사이를 첫번째 인수로 구분

SELECT COUNT(*) FROM employees WHERE gender = 'f' AND (YEAR(hire_date) = 1987 OR YEAR(hire_date) = 1989);
SELECT COUNT(*) FROM employees WHERE gender = 'f' AND (substring(hire_date, 1, 4) = 1987 OR substring(hire_date,1,4) = 1989);
=> 위아래 쿼리는 같은 결과를 냄
=> substring함수는 첫번째 인자로 값, 두번째인자로 시작 위치, 세번째인자로 잘라 낼 갯수를 의미

SELECT CAST('2020-10-19 12:35:29.123' AS DATE); -- 2020-10-19
SELECT CAST('2020-10-19 12:35:29.123' AS TIME); -- 12:35:29
SELECT CAST('2020-10-19 12:35:29.123' AS DATETIME); -- 2020-10-19 12:35:29
=> 형전환 함수(CAST)

set @myval=10;
=> 변수 선언

SELECT ename, case 필드명 when 조건 then 값
						  when 조건 then 값
					      when 조건 then 값
						  when 조건 then 값
						  when 조건 then 값
						  ELSE 값
			  END AS dname
FROM emp;
=> 필드의 값에 따라 then으로 값을 넣어줄 수 있음

Ex)
SELECT ename, case when sal>= 4000 then 'A'
								  when 20 then 'B'
								  when 30 then 'C'
								  ELSE 'D'
					END grade
FROM emp;
=> 조건안에 필드가 들어가는 경우 case옆에 필드명을 안줘도 됨

SELECT ASCII('A');
=> 아스키 코드값 출력

SELECT CHAR(56);
=> 아스키코드값으로 문자 출력

SELECT BIT_LENGTH('abc'), CHAR_LENGTH('abc'), LENGTH('abc');
=> BIT_LENGTH는 데이터 저장에 필요한 비트 수
=> CHAR_LENGTH는 문자열 길이
=> LENGTH는 차지하는 byte 수

SELECT ELT(1, '사과', '바나나', '딸기');  -- 사과
=> 문자열 찾는 함수,
=> 첫번째 인수는 찾을 위치(1부터시작), 나머지 인수는 문자열
=> 없을 시 NULL

SELECT FIELD ('둘', '하나', '둘', '셋'); -- 2
=> 문자열 위치를 찾는 함수
=> 첫번째 인수는 찾을 문자열, 나머지 인수는 문자열
=> 없을 시 0

SELECT FIND_IN_SET('둘', '하나,둘,셋,넷'); -- 
=> 구분자로 구별된 하나의 문자열에서 첫번째 인수 찾기
=> 없으면 0

SELECT INSTR('하나둘셋', 둘); -- 3
=> 첫번째 인수 문자열에서 두번째 인수 찾기
=> 없으면 0

SELECT LTRIM('       왼쪽   *      '); -- 왼쪽 공백 제거
SELECT RTRIM('    *   오른쪽         '); -- 오른쪽 공백 제거
SELECT TRIM('       *양쪽*        '); -- 양쪽 공백 제거

SELECT REPLACE('이것이 mysql이다', '이것이', 'This is');
=> 첫번째 인수에서 두번째 인수를 찾아 세번째 인수로 변경

SELECT ename, deptno FROM emp WHERE deptno = 10
UNION ALL -- 그냥 union이면 중복제거
SELECT dname, deptno FROM dept;
=> 검색등에서 여러 테이블에서 검색관련 내용을 가져오기 위해서 사용
=> 가져오려는 데이터의 타입과, 위치, 갯수만 맞으면 가능
=> ename과 dname은 타입과 위치가 맞고 전체 가져오려는 필드가 2개씩이라 가능
=> 자기자신도 union 가능
```

##### Join 연산
- inner join : 양쪽 테이블에서 데이터가 공통으로 있어야 출력
- outer join 
    - left outer join : 왼쪽의 데이터가 모두 나옴
    - right outer join : 오른쪽 데이터가 모두 나옴
    - full outer join : 양쪽 데이터가 모두 나옴
    - from 절에 가까이 있는 데이터가 left 방향에 해당함
- join할 테이블이 여러개인 경우는 쿼리문에 join 쿼리를 계속 사용해주면 된다.

###### INNER JOIN
```
SELECT empno, ename, dname
FROM emp
INNER JOIN dept ON emp.deptno=dept.deptno;
=> emp와 dept를 inner join 하되 on조건을 만족시키는 값을 조인하라
```

###### LEFT OUTER JOIN
```
SELECT empno, ename, dname
FROM emp
LEFT OUTER JOIN dept ON emp.deptno=dept.deptno;
=> emp와 dept를 join 하되 left에 해당하는 emp 데이터는 모두 출력하면서 그 중 on조건이 만족하지 않으면 null이 출력
```

###### RIGHT OUTER JOIN
```
SELECT empno, ename, dname
FROM emp
RIGHT OUTER JOIN dept ON emp.deptno=dept.deptno;
=> emp와 dept를 inner join 하되 right에 해당하는 dept 데이터는 모두 출력하면서 그 중 on조건이 만족하지 않으면 null이 출력
```

###### SELF JOIN
- 나와 나를 join
```
SELECT a.ename, b.ename AS mgr 
FROM emp AS a
LEFT OUTER JOIN emp AS b ON a.mgr = b.empno;
=> 테이블 명이 같으면 충돌이 나기 때문에 앞에 테이블명을 붙여야함
```

##### 서브쿼리
- 쿼리 내에서 실행되는(먼저 실행됨) 쿼리
- 서브쿼리가 먼저 실행되고 그 결과값을 가지고 주쿼리가 실행됨
- 서브쿼리는 select, from, where 어디나 올 수 있음
- select 절에는 서브쿼리의 수행결과가 한개 또는 null 인 것만 올 수 있음
- from은 상관 없고, where 절은 한개올 때와 여러개 올 때 처리가 다름

###### 서브쿼리(SELECT)
```
SELECT num, userid, (SELECT NAME FROM usertbl WHERE userid=a.userid), prodname, price
FROM buytbl as a;
=> join과 서브쿼리가 결과가 비슷하지만 원칙적으로join이 가능할 경우 join을 사용함
```

###### 서브쿼리(FROM)
```
SELECT *
FROM (
	SELECT num,a.userID, NAME, prodName, price
	FROM buytbl AS a
	LEFT outer JOIN usertbl AS b
	ON a.userID = b.userID
) AS a
WHERE a.userid='kbs' OR a.userid='jyp' 
=> FROM 안에 쿼리문 결과를 하나의 테이블로 봐서 select문을 실행한다고 생각
```

###### 서브쿼리(WHERE)
```
SELECT empno, ename
FROM emp
WHERE deptno = (SELECT deptno FROM emp WHERE sal=(SELECT MAX(sal) FROM emp);
=> 최대 급여를 받은 사람이 있는 부서와 같은 부서에서 일하는 사람들
```

#### CREATE
- AUTO_INCREMENT 는 해당 필드가 반드시 PRIMARY KEY 여야 함
```
create table board(
    id int,
    title varchar(10),
    writer varchar(10),
    contents varchar(30),
    wdate date
);
=> 테이블 생성


CREATE TABLE emp2 AS SELECT * FROM emp;
=> emp의 모든 데이터와 구조를 emp2 복사
=> 제약조건은 복사 안됨

CREATE TABLE emp3 AS SELECT ename, sal FROM emp where deptno=10;
=> emp의 특정 데이터와 구조만 emp3에 복사

CREATE TABLE emp4 as SELECT * FROM emp where false;
=> emp 테이블의 구조만 복사
```

#### INSERT
```
INSERT INTO board VALUES(1, '게시글1', '내용1', '작성자1', NOW());
=> 테이블 데이터 넣기
=> 만든 테이블의 필드 순서를 맞춰야 한다.
```

#### UPDATE
```
UPDATE 테이블 SET 필드네임1='데이터1', 필드네임2='데이터2' WHERE 조건= 값;
=> 특정 데이터 값 수정
=> WHERE 값이 없다면 모든 값이 변경
```

#### DELETE
```
DELETE FROM 테이블 WHERE id=${id}
=> 특정 데이터 삭제
=> WHERE 없을 시 모든 데이터 삭제
```

#### ALTER
```
ALTER TABLE 테이블명
ADD CONSTRAINT 제약조건이름 => 생략가능(알아서 생성)
FOREIGN KEY(PRIMARY KEY) 참조필드명 
REFERENCES 참조테이블(참조컬럼); => FOREIGN KEY 지정시 사용
=> 특정 테이블 FOREIGN KEY(PRIMARY KEY) 설정
=> FOREIGN KEY 설정 시 해당 필드는 PRIMARY KEY이나 UNIQUE 여야 함
=> 위 경우에 참조되는 테이블(REFERENCES 값)의 데이터는 함부로 삭제 불가능하며 테이블도 삭제 불가능하다.
=> 또한 변경될 테이블에도 참조하는 테이블에 없는 데이터는 삽입할 수 없음 (CONSTRAINT로 제약조건을 걸었기 때문)

ALTER TABLE 테이블명 ADD PRIMARY KEY(컬럼명, 컬럼명);
=> primary key 추가하기

ALTER TABLE 테이블명 DROP PRIMARY KEY;
=> primary key 삭제

ALTER TABLE 테이블명 DROP FOREIGN KEY;
=> foreign key 삭제 

ALTER TABLE emp3 ADD COLUMN read_yn CHAR(1);
=> emp3 테이블에 read_yn 필드 추가

ALTER TABLE emp3 DROP COLUMN read_yn CHAR(1);
=> emp3 테이블에 read_yn 필드 삭제

ALTER TABLE emp3 MODIFY COLUMN hiredate VARCHAR(20);
=> emp3 테이블의 컬럼 수정
```

#### DROP
```
DROP TABLE 테이블명;
=> 해당 테이블 삭제

DROP DATABASE DB명;
=> 해당 데이터베이스 삭제
```

#### TRUNCATE
```
TRUNCATE TABLE 테이블명;
=> 테이블 구조만 남기고 모든 데이터 삭제
```

#### IF문
- IF문을 끝내기 위해선 END IF를 붙여줘야함
```
CREATE OR REPLACE PROCEDURE ifproc(IN num INT)
BEGIN 
	if num % 2 = 0 then
		SELECT '짝수 입니다';
	else
		SELECT '홀수 입니다';
	END if;
END $$
=> else if를 쓸때는 ELSEIF로 붙여줘야함
```

#### WHILE문
- IF문을 끝내기 위해선 END WHILE를 붙여줘야함
```
while(조건식) DO
	쿼리문;
END while;
```

#### Label
- loop를 중간에 멈추거나(break) 생략하고 처리할 때(continue) 사용
- iterate : continue
- leave : break

##### leave
```
mywhile: --라벨설정
    while(조건식) DO
	    쿼리문;
        leave mywhile;
    END while;
```

##### iterate
```
mywhile: --라벨설정
    while(조건식) DO
	    쿼리문;
        iterate mywhile;
    END while;
```

#### repeat until
- repeat 조건이 거짓인동안 수행
- 최소 1회이상 수행(do - while문)
```
repeat
    쿼리문
until 조건문 -- 여기에 ;붙이면 안됨
END repeat;
```

#### loop
- 무조건 무한루프라서 라벨설정이 필수
```
mywhile: --라벨설정 필수
    loop
	    쿼리문;
        leave mywhile;
    END loop;
```

### Transaction(트랜잭션)
- 필요한  동작이 하나의 목적을 위해 한꺼번에 수행되는 것
- Ex) 은행 A DB에서 돈이 나갔음을 저장하면서 은행 B DB에는 입금되었음을 저장
- DDL은 복구 불가능하고 DML(insert, delete, update)은 필요에 의해 복구할 수 있음

#### autocommit 변수 사용
```
SHOW VARIABLES LIKE 'autocommit%';
=> 변수의 현재 상태를 보는 쿼리
SET autocommit = FALSE;
=> 변수 값을 설정(false일 경우 off로 저장 default 는 on)
INSERT INTO emp(empno, ename) VALUES (8004, '둘리');
=> 위에서 autocommit을 false로 줬기 때문에 불완전상태
(즉, 바로 적용되지 않은 상태라 생각, git에서 add와 비슷함) 
SELECT * FROM emp; 
=> insert한 값이 보여짐
ROLLBACK;(commit;)
=> 내용 원상복구, 만약 불완전상태를 그냥 확정시키고 싶다면 commit 사용
SELECT * FROM emp;
=> ROLLBACK 하여 insert 전으로 되돌아옴
```

#### START TRANSACTION 사용
```
START TRANSACTION;
=> commit 이나 rollback 하기 전까지 불확정 상태
SELECT * FROM emp2;
DELETE FROM emp2;
SELECT * FROM emp2;
ROLLBACK ; => delete 한 값 복구
SELECT * FROM emp2;
```

### MySQL 변수 선언
```
SET @mybal= 1;
SET @a = 5;
=> 변수 선언 @있어야함

SELECT @mybal;
SELECT @a;
=> 변수 확인

PREPARE myQuery FROM 'SELECT * FROM 테이블 WHERE 필드명=? and 필드명=?';
EXECUTE myQuery USING @a @mybal;
=> PREPARE로 쿼리를 myQuery에 저장해놓고
EXECUTE로 실행시키는데 ?에는 USING에 사용한 변수를 넣음
```

### Procedure(프로시저)
- 자바스크립트 함수 : 프로시저와 함수를 합침
- 프로시저: 값반환을 못함, 함수는 반드시 값을 반환함
- 프로시저는 {} 없이 begin - end안에 입력
```
delimiter // -- ;으로 프로시저의  끝이 안나게하면서 //로 끝내줘야함(다른 문자 가능)
=> 작업 끝나고 delimiter ;로 다시 변경

CREATE PROCEDURE p1()
BEGIN
    DECLARE 변수명 변수타입 DEFAULT 값 --변수 설정
    SET 변수명 = 값 -- 변수에 값 넣기
END; //
=> 프로시저 생성

CALL pl() //
=> 프로시저 실행

DROP PROCEDURE p1;
=>  프로시저 삭제

CREATE OR REPLACE  PROCEDURE p1()
BEGIN
	SELECT CURDATE(), NOW();
END; //
=> procedure는 수정하려면 삭제하고 다시 만들어야하는데 매번 삭제하는것 보다 OR REPLACE를 붙여주면 만약 프로시저가 없다면 만들고 있다면 수정한다.

CREATE or REPLACE PROCEDURE p2(IN a int)
BEGIN
	SET a = a + 5;
	SELECT a;
END //
CALL p2(10) //
=> 파라미터 쓸 때 IN, OUT, INOUT 중에 선택, IN 예제
=> IN : 파라미터 값을 외부로부터 입력받기 위한 용도
=> OUT : 파라미터를 통해 외부로 값을 전달하고자 하는 용도
=> INOUT : 입력과 출력을 동시에 사용하고자 하는 용도

CREATE OR replace PROCEDURE p3(OUT result INT)
   BEGIN
   	SET result = 10;
   END //
SET @a= 0 //
call proc4(@a) //
select @a
=> OUT 예제
=> 매개변수에 out을 주면 call 할때 변수를 넣어서 그 변수에 값을 넣음

CREATE OR REPLACE PROCEDURE swap(INOUT x INT, INOUT y INT)
BEGIN
	DECLARE temp INT;
	SET temp = x;
	SET x = y;
	SET y = temp;
END //
SET @X = 10//
SET @Y = 20//
CALL swap(@X, @Y)//
SELECT @X, @Y //
=> INOUT 예제
```

### 함수
- 함수는 변수 앞에 아무 것도 붙이면 안됨
- 함수는 처리한 값을 반환할 수 있기 때문에 OUT의 의미가 없고 반환 값은 한개만 가능함
```
delimiter //

CREATE OR REPLACE FUNCTION 함수명(파라미터)
RETURNS 타입
BEGIN
	RETURN 값; -- 값은 하나만 반환
END//
=> 주의사항 : 파라미터 앞에 in, out, inout 안붙임
=> 함수는 파라미터를 통해서 값을 입력만 받음
=> 반환값을 활용
=> 호출시 call 사용 x select 사용

SELECT myfn();
=> 함수호출

CREATE OR REPLACE FUNCTION fnDname(pdeptno INT)
RETURNS VARCHAR(30)
BEGIN
	DECLARE vdname VARCHAR(30);
	SELECT dname
	INTO vdname -- 검색결과를 vdname 변수에 넣기
	FROM dept 
	WHERE deptno= pdeptno;
	
	RETURN vdname;
END //
SELECT empno, ename, fnDname(deptno) FROM emp //
```

### 에러처리
- 오류가 발생 시 처리
- 에러코드는 에러를 발생시켜보면 ERROR 에러코드 형식으로 에러가 나기때문에 해당 에러코드를 사용
```
CREATE OR REPLACE PROCEDURE errorProc()
BEGIN
	DECLARE CONTINUE handler FOR 1146 SELECT '테이블이 존재하지 않습니다' AS 메시지; -- 에러처리
	SELECT * FROM tb_test;
END$$

CALL errorproc() $$


USE sqldb$$
CREATE OR REPLACE PROCEDURE errorProc2()
BEGIN
	DECLARE CONTINUE handler FOR SQLEXCEPTION 
	BEGIN
		SELECT '오류발생' AS 메시지;
		SHOW ERRORS;
		ROLLBACK; 
	END;
	INSERT INTO usertbl VALUES('LSG','이상구','1988','서울',NULL,NULL, 170, CURRENT_DATE());
END$$
CALL errorproc2() $$
```

### 커서
- 데이터를 SELECT 해서 가져오면 그 데이터를 접근하는 객체
- 여러 데이터를 가져와도 접근할 수 있음
```
declare 커서명 cursor for 쿼리;
=> 커서 선언

open 커서명
=> 커서 오픈

fetch 커서명 into 변수1, 변수2, ...
=> 끝을 알려주지 않고 예외를 발생시킴
=> 예외에서 종료 변수에 값을 바꿔서 강제로 종료 시키게 함

close 커서명
=> 커서 닫기

CREATE OR REPLACE PROCEDURE cursor_proc()
BEGIN
	DECLARE vname VARCHAR(20);
	DECLARE endflag INT DEFAULT 0;
	-- DECLARE vname VARCHAR(20);
	
	-- 커서 객체 생성
	DECLARE mycursor CURSOR for
		SELECT ename FROM emp;
		
	-- 예외처리객체 선언
	DECLARE CONTINUE handler FOR NOT FOUND SET endflag= 1;
	-- 더이상 데이터가 없을 때 예외를 발생시켜 endflag를 1로 변경
	OPEN mycursor;
	
	repeat
		fetch mycursor INTO vname;
		SELECT vname;
	until endflag=1 END repeat;
	
	close mycursor;
END$$

CALL cursor_proc() $$
=> emp 테이블의 데이터를 다 불러와서 뿌리기
```

### VIEW
- 가상테이블을 생성
- AS 다음 쿼리를 통해서 생성
```
CREATE OR REPLACE VIEW v_customer AS
SELECT shippeddate, customername, addressline1, d.productname,
c.quantityordered, c.priceeach
FROM orders a
LEFT OUTER JOIN customers b ON a.customernumber = b.customernumber
LEFT outer JOIN orderdetails c ON a.ordernumber= c.ordernumber
LEFT OUTER JOIN products d ON c.productCode=d.productCode;
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
## MongoDB(NoSQL DB)
- MongDB는 데이터 저장 관리만 가능
- 일반적인 DB가 갖고 있는 성격인 무결성, 중복성배제, 일관성과 같은 성격을 갖고 있지 않음
- 일관성을 요하는 은행업무와 같은 곳에 사용하기엔 어려움이 있음
- 대소문자 구별
- Collection<=>Table, row<=>Document

### MongoDB 명령어
- 나를 지칭하는 것이 db
```
use DB이름;
=> db사용 및 없을 때 생성

show collections;
=> 컬렉션 확인

db.createCollection('컬렉션이름');
=> 컬렉션 생성

db.컬렉션이름.insert({name : '홍길동', age: 23, gender:'M'});
=> 데이터 삽입

db.컬렉션이름.find({ name : '홍길동'})
=> 데이터 찾기, 매개변수 없으면 전체 데이터 불러옴
=> LIKE와 비슷한 기능을 위해서는 정규표현식을 사용해야 함

db.컬렉션이름.update({ name: '홍길동'}, {$set : { age:40, gender: 'F'}});
=> 첫번째 json에는 바꾸고자 할 위치를 나타내며, 두번째 json으로 바꿀값을 설정
=> 값을 변경 시 $set을 사용하여 표현

db.컬렉션이름.remove({ name : '홍길동});
=> 매개변수로 특정 데이터 지정하여 삭제
=> 매개변수를 주지 않는다면 모든 데이터 삭제

db.customSequence.findAndModify({query : {_id : 'board'}, update: {$inc : {seq:1}}, new:true})
=> query로 찾을 데이터 검색 후 update로 수정, new로 수정된 데이터 표현(없으면 수정전 데이터 표현)
```
### MongDB 조건부여

|조건|내용|
|:---:|:---:|
|$eq|(equals) 주어진 값과 일치하는 값|
|$gt|(greater than) 주어진 값보다 큰 값|
|$gte|(greather than or equals) 주어진 값보다 크거나 같은 값|
|$lt|(less than) 주어진 값보다 작은 값|
|$lte|(less than or equals) 주어진 값보다 작거나 같은 값|
|$ne|(not equal) 주어진 값과 일치하지 않는 값|
|$in|주어진 배열 안에 속하는 값|
|$nin|주어진 배열 안에 속하지 않는 값|