--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: answer_id_seq; Type: SEQUENCE; Schema: public; Owner: faquser
--

CREATE SEQUENCE public.answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answer_id_seq OWNER TO faquser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: answer; Type: TABLE; Schema: public; Owner: faquser
--

CREATE TABLE public.answer (
    id integer DEFAULT nextval('public.answer_id_seq'::regclass) NOT NULL,
    question_id integer,
    author_id integer,
    answer_body character varying,
    like_count integer,
    dislike_count integer
);


ALTER TABLE public.answer OWNER TO faquser;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: faquser
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO faquser;

--
-- Name: category; Type: TABLE; Schema: public; Owner: faquser
--

CREATE TABLE public.category (
    id integer DEFAULT nextval('public.category_id_seq'::regclass) NOT NULL,
    name character varying
);


ALTER TABLE public.category OWNER TO faquser;

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: faquser
--

CREATE SEQUENCE public.likes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.likes_id_seq OWNER TO faquser;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: faquser
--

CREATE TABLE public.likes (
    id bigint DEFAULT nextval('public.likes_id_seq'::regclass) NOT NULL,
    author_id integer,
    answer_id integer,
    islike boolean
);


ALTER TABLE public.likes OWNER TO faquser;

--
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: faquser
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_id_seq OWNER TO faquser;

--
-- Name: question; Type: TABLE; Schema: public; Owner: faquser
--

CREATE TABLE public.question (
    id integer DEFAULT nextval('public.question_id_seq'::regclass) NOT NULL,
    author_id integer,
    question_title character varying,
    question_body character varying
);


ALTER TABLE public.question OWNER TO faquser;

--
-- Name: question_category; Type: TABLE; Schema: public; Owner: faquser
--

CREATE TABLE public.question_category (
    category_id integer,
    question_id integer
);


ALTER TABLE public.question_category OWNER TO faquser;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: faquser
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO faquser;

--
-- Name: users; Type: TABLE; Schema: public; Owner: faquser
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    name character varying,
    email character varying,
    gender character varying,
    password character varying
);


ALTER TABLE public.users OWNER TO faquser;

--
-- Data for Name: answer; Type: TABLE DATA; Schema: public; Owner: faquser
--

COPY public.answer (id, question_id, author_id, answer_body, like_count, dislike_count) FROM stdin;
1	1	1	I guess the home team will win, they are unstoppable this season	1	0
2	1	2	I agree with that	0	0
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: faquser
--

COPY public.category (id, name) FROM stdin;
1	tech
2	movie
3	videogame
4	sport
5	common_life
6	other
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: faquser
--

COPY public.likes (id, author_id, answer_id, islike) FROM stdin;
1	2	1	t
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: faquser
--

COPY public.question (id, author_id, question_title, question_body) FROM stdin;
1	2	What do you think, which team is going to win tonight?	I am corious about people thoughts, so explain yourself.
\.


--
-- Data for Name: question_category; Type: TABLE DATA; Schema: public; Owner: faquser
--

COPY public.question_category (category_id, question_id) FROM stdin;
4	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: faquser
--

COPY public.users (id, name, email, gender, password) FROM stdin;
1	erzsi	erzsi@email.com	female	$2b$10$hYXmgPu8SaBNokCebvQP5ePapOa.sihfFO4HBbOEVa/8RjrS3cS5a
2	bill	bill@email.com	male	$2b$10$b/yQXp6a7T6UbBLPmLT2QevFj85RTgxK4Z/3sL1tEZYfAkh81UgCi
\.


--
-- Name: answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faquser
--

SELECT pg_catalog.setval('public.answer_id_seq', 2, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faquser
--

SELECT pg_catalog.setval('public.category_id_seq', 1, false);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faquser
--

SELECT pg_catalog.setval('public.likes_id_seq', 1, true);


--
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faquser
--

SELECT pg_catalog.setval('public.question_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faquser
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: answer answer_pkey; Type: CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT answer_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- Name: likes unique_like; Type: CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT unique_like UNIQUE (author_id, answer_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: likes fk_answer_id; Type: FK CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_answer_id FOREIGN KEY (answer_id) REFERENCES public.answer(id);


--
-- Name: question fk_author_id; Type: FK CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT fk_author_id FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: answer fk_author_id; Type: FK CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT fk_author_id FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: likes fk_author_id; Type: FK CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_author_id FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: question_category fk_category_id; Type: FK CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.question_category
    ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: question_category fk_question_id; Type: FK CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.question_category
    ADD CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES public.question(id);


--
-- Name: answer fk_question_id; Type: FK CONSTRAINT; Schema: public; Owner: faquser
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES public.question(id);


--
-- PostgreSQL database dump complete
--

