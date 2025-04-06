--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-04-06 20:04:49

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
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    puntuacion_gravedad integer
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
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 219
-- Name: cribado_sesiones_id_sesion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cribado_sesiones_id_sesion_seq OWNED BY public.cribado_sesiones.id_sesion;


--
-- TOC entry 226 (class 1259 OID 24648)
-- Name: deteccion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deteccion (
    id_deteccion integer NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_usuario integer,
    id_ansiedad integer
);


ALTER TABLE public.deteccion OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24647)
-- Name: deteccion_id_deteccion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deteccion_id_deteccion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.deteccion_id_deteccion_seq OWNER TO postgres;

--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 225
-- Name: deteccion_id_deteccion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deteccion_id_deteccion_seq OWNED BY public.deteccion.id_deteccion;


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
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 221
-- Name: respuestas_cribado_id_respuesta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.respuestas_cribado_id_respuesta_seq OWNED BY public.respuestas_cribado.id_respuesta;


--
-- TOC entry 224 (class 1259 OID 24633)
-- Name: tipo_ansiedad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_ansiedad (
    id_ansiedad integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.tipo_ansiedad OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24632)
-- Name: tipo_ansiedad_idansiedad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_ansiedad_idansiedad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_ansiedad_idansiedad_seq OWNER TO postgres;

--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 223
-- Name: tipo_ansiedad_idansiedad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_ansiedad_idansiedad_seq OWNED BY public.tipo_ansiedad.id_ansiedad;


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
    two_factor_activado boolean DEFAULT true,
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
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4718 (class 2604 OID 24605)
-- Name: cribado_sesiones id_sesion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cribado_sesiones ALTER COLUMN id_sesion SET DEFAULT nextval('public.cribado_sesiones_id_sesion_seq'::regclass);


--
-- TOC entry 4722 (class 2604 OID 24651)
-- Name: deteccion id_deteccion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deteccion ALTER COLUMN id_deteccion SET DEFAULT nextval('public.deteccion_id_deteccion_seq'::regclass);


--
-- TOC entry 4720 (class 2604 OID 24618)
-- Name: respuestas_cribado id_respuesta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado ALTER COLUMN id_respuesta SET DEFAULT nextval('public.respuestas_cribado_id_respuesta_seq'::regclass);


--
-- TOC entry 4721 (class 2604 OID 24636)
-- Name: tipo_ansiedad id_ansiedad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_ansiedad ALTER COLUMN id_ansiedad SET DEFAULT nextval('public.tipo_ansiedad_idansiedad_seq'::regclass);


--
-- TOC entry 4715 (class 2604 OID 16393)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4729 (class 2606 OID 24608)
-- Name: cribado_sesiones cribado_sesiones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cribado_sesiones
    ADD CONSTRAINT cribado_sesiones_pkey PRIMARY KEY (id_sesion);


--
-- TOC entry 4735 (class 2606 OID 24654)
-- Name: deteccion deteccion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deteccion
    ADD CONSTRAINT deteccion_pkey PRIMARY KEY (id_deteccion);


--
-- TOC entry 4731 (class 2606 OID 24620)
-- Name: respuestas_cribado respuestas_cribado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_pkey PRIMARY KEY (id_respuesta);


--
-- TOC entry 4733 (class 2606 OID 24638)
-- Name: tipo_ansiedad tipo_ansiedad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_ansiedad
    ADD CONSTRAINT tipo_ansiedad_pkey PRIMARY KEY (id_ansiedad);


--
-- TOC entry 4725 (class 2606 OID 16400)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4727 (class 2606 OID 16398)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4736 (class 2606 OID 24609)
-- Name: cribado_sesiones cribado_sesiones_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cribado_sesiones
    ADD CONSTRAINT cribado_sesiones_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4739 (class 2606 OID 24660)
-- Name: deteccion deteccion_id_ansiedad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deteccion
    ADD CONSTRAINT deteccion_id_ansiedad_fkey FOREIGN KEY (id_ansiedad) REFERENCES public.tipo_ansiedad(id_ansiedad);


--
-- TOC entry 4740 (class 2606 OID 24655)
-- Name: deteccion deteccion_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deteccion
    ADD CONSTRAINT deteccion_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- TOC entry 4737 (class 2606 OID 24621)
-- Name: respuestas_cribado respuestas_cribado_id_sesion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_id_sesion_fkey FOREIGN KEY (id_sesion) REFERENCES public.cribado_sesiones(id_sesion) ON DELETE CASCADE;


--
-- TOC entry 4738 (class 2606 OID 24626)
-- Name: respuestas_cribado respuestas_cribado_id_sesion_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_id_sesion_fkey1 FOREIGN KEY (id_sesion) REFERENCES public.cribado_sesiones(id_sesion) ON DELETE CASCADE;


-- Completed on 2025-04-06 20:04:49

--
-- PostgreSQL database dump complete
--

