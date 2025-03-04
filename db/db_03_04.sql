--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-03-04 19:54:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 24602)
-- Name: cribado_sesiones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cribado_sesiones (
    id_sesion integer NOT NULL,
    id_usuario integer,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cribado_sesiones OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24601)
-- Name: cribado_sesiones_id_sesion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cribado_sesiones_id_sesion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cribado_sesiones_id_sesion_seq OWNER TO postgres;

--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 219
-- Name: cribado_sesiones_id_sesion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cribado_sesiones_id_sesion_seq OWNED BY public.cribado_sesiones.id_sesion;


--
-- TOC entry 222 (class 1259 OID 24615)
-- Name: respuestas_cribado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.respuestas_cribado (
    id_respuesta integer NOT NULL,
    id_sesion integer,
    numero_pregunta integer NOT NULL,
    puntuacion_respuesta integer NOT NULL
);


ALTER TABLE public.respuestas_cribado OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24614)
-- Name: respuestas_cribado_id_respuesta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.respuestas_cribado_id_respuesta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.respuestas_cribado_id_respuesta_seq OWNER TO postgres;

--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 221
-- Name: respuestas_cribado_id_respuesta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.respuestas_cribado_id_respuesta_seq OWNED BY public.respuestas_cribado.id_respuesta;


--
-- TOC entry 218 (class 1259 OID 16390)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100),
    email character varying(100) NOT NULL,
    password text NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fechanacimiento date NOT NULL,
    genero character varying(20),
    two_factor_activado boolean DEFAULT false,
    two_factor_codigo character varying(6),
    two_factor_expiracion timestamp without time zone
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16389)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4708 (class 2604 OID 24605)
-- Name: cribado_sesiones id_sesion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cribado_sesiones ALTER COLUMN id_sesion SET DEFAULT nextval('public.cribado_sesiones_id_sesion_seq'::regclass);


--
-- TOC entry 4710 (class 2604 OID 24618)
-- Name: respuestas_cribado id_respuesta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado ALTER COLUMN id_respuesta SET DEFAULT nextval('public.respuestas_cribado_id_respuesta_seq'::regclass);


--
-- TOC entry 4705 (class 2604 OID 16393)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4870 (class 0 OID 24602)
-- Dependencies: 220
-- Data for Name: cribado_sesiones; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4872 (class 0 OID 24615)
-- Dependencies: 222
-- Data for Name: respuestas_cribado; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4868 (class 0 OID 16390)
-- Dependencies: 218
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuarios (id, nombre, email, password, fecha_registro, fechanacimiento, genero, two_factor_activado, two_factor_codigo, two_factor_expiracion) VALUES (4, 'aaa', 'a@aa', '$2b$10$0Ug94OgHvrerKGeCfmDwhOskIEAWwadzUn9rVjcuXmkWYsfq/zY.q', '2025-02-27 20:19:45.585855', '2004-11-01', 'Hombre', false, NULL, NULL);
INSERT INTO public.usuarios (id, nombre, email, password, fecha_registro, fechanacimiento, genero, two_factor_activado, two_factor_codigo, two_factor_expiracion) VALUES (9, '5h5e', 'dewdq@dc', '$2b$10$8azWBBuzb5wChAW.C62TRuYRy6P.awoPvxdgAkNtKptHTdTh0.WKi', '2025-02-27 20:37:16.428861', '2025-01-29', 'Hombre', false, NULL, NULL);
INSERT INTO public.usuarios (id, nombre, email, password, fecha_registro, fechanacimiento, genero, two_factor_activado, two_factor_codigo, two_factor_expiracion) VALUES (10, 'pepe', 'pepe@email.com', '$2b$10$OQv4caXQ0Xh1KhiwMgJ3kOHEnFFpEd1veFXGmxej3R0iN2/SGVnOW', '2025-03-01 12:54:40.894014', '2002-02-01', 'Mujer', false, NULL, NULL);
INSERT INTO public.usuarios (id, nombre, email, password, fecha_registro, fechanacimiento, genero, two_factor_activado, two_factor_codigo, two_factor_expiracion) VALUES (11, 'Luis', 'luis@email.com', '$2b$10$TQtJuneHfMg.VAbsx4PrnunB30CnDJ4Um5CUlkFrZOTOYtZgeam/W', '2025-03-01 13:26:40.470156', '1998-07-01', 'Hombre', false, NULL, NULL);
INSERT INTO public.usuarios (id, nombre, email, password, fecha_registro, fechanacimiento, genero, two_factor_activado, two_factor_codigo, two_factor_expiracion) VALUES (12, 'Maria José', 'mj@email.com', '$2b$10$jTzeyzGOJJj9zDg.PWqbSOdjIsSNbNbRz8S8YyXREuvXVmdG51e.y', '2025-03-01 14:00:22.466111', '1999-02-04', 'Mujer', false, NULL, NULL);
INSERT INTO public.usuarios (id, nombre, email, password, fecha_registro, fechanacimiento, genero, two_factor_activado, two_factor_codigo, two_factor_expiracion) VALUES (1, 'Alejandro', 'alejandrogarciamenor@gmail.com', '$2a$10$kicYIqr2SsV3x0jqDE8Wq.ZtXH7BK1Qz5nuShoJ4biDau15ZbpZDe', '2025-02-06 14:04:33.660407', '2003-11-28', 'Hombre', true, '451149', '2025-03-02 12:55:33.279');
INSERT INTO public.usuarios (id, nombre, email, password, fecha_registro, fechanacimiento, genero, two_factor_activado, two_factor_codigo, two_factor_expiracion) VALUES (13, 'Jesus ', 'jesusgarciasoria@gmail.com', '$2b$10$9kXoxL3FgO/FqCQD/AlFrus0EIXT3n02q9dXPq.toLXHF/oxj2QeS', '2025-03-02 12:55:19.76739', '1997-06-02', 'Hombre', true, NULL, NULL);
INSERT INTO public.usuarios (id, nombre, email, password, fecha_registro, fechanacimiento, genero, two_factor_activado, two_factor_codigo, two_factor_expiracion) VALUES (3, 'aaa', 'a@a', '$2b$10$wyImaysOj5EpeXtKlF72Henyl1EpDhZBAxsNc/BvLJwhhODM4wVWW', '2025-02-27 20:15:32.295371', '2003-11-28', 'Hombre', false, NULL, NULL);
INSERT INTO public.usuarios (id, nombre, email, password, fecha_registro, fechanacimiento, genero, two_factor_activado, two_factor_codigo, two_factor_expiracion) VALUES (15, 'Maria Jose Esteban', 'mjesteban@telefonica.net', '$2b$10$GiXU0hqbzZA.LfQV1aVUx.S415ywaDhphyZvupsh3VwZ15uqHiSye', '2025-03-02 14:32:35.671254', '1996-07-19', 'Mujer', true, NULL, NULL);
INSERT INTO public.usuarios (id, nombre, email, password, fecha_registro, fechanacimiento, genero, two_factor_activado, two_factor_codigo, two_factor_expiracion) VALUES (14, 'Laura Espinosa', 'laura.espinosa593@gmail.com', '$2b$10$YIxwtHL0D1pDp8l2eR5b1OmPvCI7WyWYhDmf9aYzFa1c6fagS6mgG', '2025-03-02 13:20:37.690615', '2003-09-05', 'Mujer', true, NULL, NULL);


--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 219
-- Name: cribado_sesiones_id_sesion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cribado_sesiones_id_sesion_seq', 1, false);


--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 221
-- Name: respuestas_cribado_id_respuesta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.respuestas_cribado_id_respuesta_seq', 1, false);


--
-- TOC entry 4883 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 15, true);


--
-- TOC entry 4716 (class 2606 OID 24608)
-- Name: cribado_sesiones cribado_sesiones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cribado_sesiones
    ADD CONSTRAINT cribado_sesiones_pkey PRIMARY KEY (id_sesion);


--
-- TOC entry 4718 (class 2606 OID 24620)
-- Name: respuestas_cribado respuestas_cribado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_pkey PRIMARY KEY (id_respuesta);


--
-- TOC entry 4712 (class 2606 OID 16400)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4714 (class 2606 OID 16398)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4719 (class 2606 OID 24609)
-- Name: cribado_sesiones cribado_sesiones_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cribado_sesiones
    ADD CONSTRAINT cribado_sesiones_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4720 (class 2606 OID 24621)
-- Name: respuestas_cribado respuestas_cribado_id_sesion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_id_sesion_fkey FOREIGN KEY (id_sesion) REFERENCES public.cribado_sesiones(id_sesion) ON DELETE CASCADE;


--
-- TOC entry 4721 (class 2606 OID 24626)
-- Name: respuestas_cribado respuestas_cribado_id_sesion_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_id_sesion_fkey1 FOREIGN KEY (id_sesion) REFERENCES public.cribado_sesiones(id_sesion) ON DELETE CASCADE;


-- Completed on 2025-03-04 19:54:58

--
-- PostgreSQL database dump complete
--

