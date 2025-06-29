--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-04-20 19:50:08

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
-- TOC entry 228 (class 1259 OID 24666)
-- Name: conversacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversacion (
    id_conversacion integer NOT NULL,
    id_usuario integer,
    resumen text,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.conversacion OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24665)
-- Name: conversacion_id_conversacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.conversacion_id_conversacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.conversacion_id_conversacion_seq OWNER TO postgres;

--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 227
-- Name: conversacion_id_conversacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conversacion_id_conversacion_seq OWNED BY public.conversacion.id_conversacion;


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
-- TOC entry 4923 (class 0 OID 0)
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
-- TOC entry 4924 (class 0 OID 0)
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
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 221
-- Name: respuestas_cribado_id_respuesta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.respuestas_cribado_id_respuesta_seq OWNED BY public.respuestas_cribado.id_respuesta;


--
-- TOC entry 230 (class 1259 OID 24681)
-- Name: retos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.retos (
    id_reto integer NOT NULL,
    contenido text NOT NULL,
    id_ansiedad integer,
    categoria text,
    activo boolean DEFAULT true
);


ALTER TABLE public.retos OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24680)
-- Name: retos_id_reto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.retos_id_reto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.retos_id_reto_seq OWNER TO postgres;

--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 229
-- Name: retos_id_reto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.retos_id_reto_seq OWNED BY public.retos.id_reto;


--
-- TOC entry 224 (class 1259 OID 24633)
-- Name: tipo_ansiedad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_ansiedad (
    id_ansiedad integer NOT NULL,
    nombre character varying(100) NOT NULL,
    informacion text
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
-- TOC entry 4927 (class 0 OID 0)
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
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 232 (class 1259 OID 24696)
-- Name: usuarios_retocompletado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios_retocompletado (
    id_usuario_reto integer NOT NULL,
    id_usuario integer,
    id_reto integer,
    fecha date NOT NULL,
    completado boolean DEFAULT false
);


ALTER TABLE public.usuarios_retocompletado OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24695)
-- Name: usuarios_retocompletado_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_retocompletado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_retocompletado_id_seq OWNER TO postgres;

--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 231
-- Name: usuarios_retocompletado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_retocompletado_id_seq OWNED BY public.usuarios_retocompletado.id_usuario_reto;


--
-- TOC entry 4739 (class 2604 OID 24669)
-- Name: conversacion id_conversacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversacion ALTER COLUMN id_conversacion SET DEFAULT nextval('public.conversacion_id_conversacion_seq'::regclass);


--
-- TOC entry 4733 (class 2604 OID 24605)
-- Name: cribado_sesiones id_sesion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cribado_sesiones ALTER COLUMN id_sesion SET DEFAULT nextval('public.cribado_sesiones_id_sesion_seq'::regclass);


--
-- TOC entry 4737 (class 2604 OID 24651)
-- Name: deteccion id_deteccion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deteccion ALTER COLUMN id_deteccion SET DEFAULT nextval('public.deteccion_id_deteccion_seq'::regclass);


--
-- TOC entry 4735 (class 2604 OID 24618)
-- Name: respuestas_cribado id_respuesta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado ALTER COLUMN id_respuesta SET DEFAULT nextval('public.respuestas_cribado_id_respuesta_seq'::regclass);


--
-- TOC entry 4741 (class 2604 OID 24684)
-- Name: retos id_reto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retos ALTER COLUMN id_reto SET DEFAULT nextval('public.retos_id_reto_seq'::regclass);


--
-- TOC entry 4736 (class 2604 OID 24636)
-- Name: tipo_ansiedad id_ansiedad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_ansiedad ALTER COLUMN id_ansiedad SET DEFAULT nextval('public.tipo_ansiedad_idansiedad_seq'::regclass);


--
-- TOC entry 4730 (class 2604 OID 16393)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4743 (class 2604 OID 24699)
-- Name: usuarios_retocompletado id_usuario_reto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_retocompletado ALTER COLUMN id_usuario_reto SET DEFAULT nextval('public.usuarios_retocompletado_id_seq'::regclass);


--
-- TOC entry 4758 (class 2606 OID 24674)
-- Name: conversacion conversacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversacion
    ADD CONSTRAINT conversacion_pkey PRIMARY KEY (id_conversacion);


--
-- TOC entry 4750 (class 2606 OID 24608)
-- Name: cribado_sesiones cribado_sesiones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cribado_sesiones
    ADD CONSTRAINT cribado_sesiones_pkey PRIMARY KEY (id_sesion);


--
-- TOC entry 4756 (class 2606 OID 24654)
-- Name: deteccion deteccion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deteccion
    ADD CONSTRAINT deteccion_pkey PRIMARY KEY (id_deteccion);


--
-- TOC entry 4752 (class 2606 OID 24620)
-- Name: respuestas_cribado respuestas_cribado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_pkey PRIMARY KEY (id_respuesta);


--
-- TOC entry 4760 (class 2606 OID 24689)
-- Name: retos retos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retos
    ADD CONSTRAINT retos_pkey PRIMARY KEY (id_reto);


--
-- TOC entry 4754 (class 2606 OID 24638)
-- Name: tipo_ansiedad tipo_ansiedad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_ansiedad
    ADD CONSTRAINT tipo_ansiedad_pkey PRIMARY KEY (id_ansiedad);


--
-- TOC entry 4746 (class 2606 OID 16400)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4748 (class 2606 OID 16398)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4762 (class 2606 OID 24702)
-- Name: usuarios_retocompletado usuarios_retocompletado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_retocompletado
    ADD CONSTRAINT usuarios_retocompletado_pkey PRIMARY KEY (id_usuario_reto);


--
-- TOC entry 4768 (class 2606 OID 24675)
-- Name: conversacion conversacion_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversacion
    ADD CONSTRAINT conversacion_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- TOC entry 4763 (class 2606 OID 24609)
-- Name: cribado_sesiones cribado_sesiones_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cribado_sesiones
    ADD CONSTRAINT cribado_sesiones_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4766 (class 2606 OID 24660)
-- Name: deteccion deteccion_id_ansiedad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deteccion
    ADD CONSTRAINT deteccion_id_ansiedad_fkey FOREIGN KEY (id_ansiedad) REFERENCES public.tipo_ansiedad(id_ansiedad);


--
-- TOC entry 4767 (class 2606 OID 24655)
-- Name: deteccion deteccion_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deteccion
    ADD CONSTRAINT deteccion_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- TOC entry 4764 (class 2606 OID 24621)
-- Name: respuestas_cribado respuestas_cribado_id_sesion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_id_sesion_fkey FOREIGN KEY (id_sesion) REFERENCES public.cribado_sesiones(id_sesion) ON DELETE CASCADE;


--
-- TOC entry 4765 (class 2606 OID 24626)
-- Name: respuestas_cribado respuestas_cribado_id_sesion_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_id_sesion_fkey1 FOREIGN KEY (id_sesion) REFERENCES public.cribado_sesiones(id_sesion) ON DELETE CASCADE;


--
-- TOC entry 4769 (class 2606 OID 24690)
-- Name: retos retos_id_ansiedad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retos
    ADD CONSTRAINT retos_id_ansiedad_fkey FOREIGN KEY (id_ansiedad) REFERENCES public.tipo_ansiedad(id_ansiedad);


--
-- TOC entry 4770 (class 2606 OID 24708)
-- Name: usuarios_retocompletado usuarios_retocompletado_id_reto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_retocompletado
    ADD CONSTRAINT usuarios_retocompletado_id_reto_fkey FOREIGN KEY (id_reto) REFERENCES public.retos(id_reto);


--
-- TOC entry 4771 (class 2606 OID 24703)
-- Name: usuarios_retocompletado usuarios_retocompletado_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_retocompletado
    ADD CONSTRAINT usuarios_retocompletado_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


-- Completed on 2025-04-20 19:50:08

--
-- PostgreSQL database dump complete
--

