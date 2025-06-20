PGDMP  "    6                }            tfg_saludmental    17.2    17.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16388    tfg_saludmental    DATABASE     �   CREATE DATABASE tfg_saludmental WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE tfg_saludmental;
                     postgres    false            �            1259    24602    cribado_sesiones    TABLE     �   CREATE TABLE public.cribado_sesiones (
    id_sesion integer NOT NULL,
    id_usuario integer,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    puntuacion_gravedad integer
);
 $   DROP TABLE public.cribado_sesiones;
       public         heap r       postgres    false            �            1259    24601    cribado_sesiones_id_sesion_seq    SEQUENCE     �   CREATE SEQUENCE public.cribado_sesiones_id_sesion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.cribado_sesiones_id_sesion_seq;
       public               postgres    false    220                       0    0    cribado_sesiones_id_sesion_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.cribado_sesiones_id_sesion_seq OWNED BY public.cribado_sesiones.id_sesion;
          public               postgres    false    219            �            1259    24615    respuestas_cribado    TABLE     �   CREATE TABLE public.respuestas_cribado (
    id_respuesta integer NOT NULL,
    id_sesion integer,
    numero_pregunta integer NOT NULL,
    puntuacion_respuesta integer NOT NULL
);
 &   DROP TABLE public.respuestas_cribado;
       public         heap r       postgres    false            �            1259    24614 #   respuestas_cribado_id_respuesta_seq    SEQUENCE     �   CREATE SEQUENCE public.respuestas_cribado_id_respuesta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.respuestas_cribado_id_respuesta_seq;
       public               postgres    false    222                       0    0 #   respuestas_cribado_id_respuesta_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.respuestas_cribado_id_respuesta_seq OWNED BY public.respuestas_cribado.id_respuesta;
          public               postgres    false    221            �            1259    16390    usuarios    TABLE     �  CREATE TABLE public.usuarios (
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
    DROP TABLE public.usuarios;
       public         heap r       postgres    false            �            1259    16389    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public               postgres    false    218                       0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public               postgres    false    217            d           2604    24605    cribado_sesiones id_sesion    DEFAULT     �   ALTER TABLE ONLY public.cribado_sesiones ALTER COLUMN id_sesion SET DEFAULT nextval('public.cribado_sesiones_id_sesion_seq'::regclass);
 I   ALTER TABLE public.cribado_sesiones ALTER COLUMN id_sesion DROP DEFAULT;
       public               postgres    false    220    219    220            f           2604    24618    respuestas_cribado id_respuesta    DEFAULT     �   ALTER TABLE ONLY public.respuestas_cribado ALTER COLUMN id_respuesta SET DEFAULT nextval('public.respuestas_cribado_id_respuesta_seq'::regclass);
 N   ALTER TABLE public.respuestas_cribado ALTER COLUMN id_respuesta DROP DEFAULT;
       public               postgres    false    221    222    222            a           2604    16393    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218                      0    24602    cribado_sesiones 
   TABLE DATA           ]   COPY public.cribado_sesiones (id_sesion, id_usuario, fecha, puntuacion_gravedad) FROM stdin;
    public               postgres    false    220   k%                 0    24615    respuestas_cribado 
   TABLE DATA           l   COPY public.respuestas_cribado (id_respuesta, id_sesion, numero_pregunta, puntuacion_respuesta) FROM stdin;
    public               postgres    false    222   y)                 0    16390    usuarios 
   TABLE DATA           �   COPY public.usuarios (id, nombre, email, password, fecha_registro, fechanacimiento, genero, two_factor_activado, two_factor_codigo, two_factor_expiracion) FROM stdin;
    public               postgres    false    218   �*                  0    0    cribado_sesiones_id_sesion_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.cribado_sesiones_id_sesion_seq', 101, true);
          public               postgres    false    219                       0    0 #   respuestas_cribado_id_respuesta_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.respuestas_cribado_id_respuesta_seq', 77, true);
          public               postgres    false    221                       0    0    usuarios_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.usuarios_id_seq', 18, true);
          public               postgres    false    217            l           2606    24608 &   cribado_sesiones cribado_sesiones_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.cribado_sesiones
    ADD CONSTRAINT cribado_sesiones_pkey PRIMARY KEY (id_sesion);
 P   ALTER TABLE ONLY public.cribado_sesiones DROP CONSTRAINT cribado_sesiones_pkey;
       public                 postgres    false    220            n           2606    24620 *   respuestas_cribado respuestas_cribado_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_pkey PRIMARY KEY (id_respuesta);
 T   ALTER TABLE ONLY public.respuestas_cribado DROP CONSTRAINT respuestas_cribado_pkey;
       public                 postgres    false    222            h           2606    16400    usuarios usuarios_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_email_key;
       public                 postgres    false    218            j           2606    16398    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public                 postgres    false    218            o           2606    24609 1   cribado_sesiones cribado_sesiones_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cribado_sesiones
    ADD CONSTRAINT cribado_sesiones_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.cribado_sesiones DROP CONSTRAINT cribado_sesiones_id_usuario_fkey;
       public               postgres    false    4714    218    220            p           2606    24621 4   respuestas_cribado respuestas_cribado_id_sesion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_id_sesion_fkey FOREIGN KEY (id_sesion) REFERENCES public.cribado_sesiones(id_sesion) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.respuestas_cribado DROP CONSTRAINT respuestas_cribado_id_sesion_fkey;
       public               postgres    false    222    220    4716            q           2606    24626 5   respuestas_cribado respuestas_cribado_id_sesion_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public.respuestas_cribado
    ADD CONSTRAINT respuestas_cribado_id_sesion_fkey1 FOREIGN KEY (id_sesion) REFERENCES public.cribado_sesiones(id_sesion) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.respuestas_cribado DROP CONSTRAINT respuestas_cribado_id_sesion_fkey1;
       public               postgres    false    4716    220    222               �  x�u��m$9E��(���K+��`�c��j�V�2T���C>x����g���r�j{�����'�!lN%>�4B�k�V�v}$|Lw�3�PK؅��N�zo����d"�����!�|�5%�B�b��u�/�A�+�*u�7���U�E2�m�H�����~_��5�L���]l{��u�פ����3]�q�zOw{�sY�T���~#�2���[F g>���*��	�:D��ts��=�=��u��cEX%-�7��zJ�b���陶��![$�.ё}���f���� �s�9yp��!D�<�EG��u�*vy�[�s>H�\:F�!���no"��'��$���&��~#w}HwK�Zܫ'Hw�B�Z�v��8i}G��a32B��Һx^�f�n_HP�Yܢ�6��E���I��v�L�#\V��.�F�!�"�.�ץ,��D�\F�	w�d�r9΀G�ͻX�+x��E���Q�=3-����0��n�����º] ��Ҋ�u��h�c���:�v_���Z�n:7�4����~#A5W�݃ذ�]�lu�/d�Nu��U�F'�uȃ9C�`(.�H�����փ\;Z��u#r������.��� Eݥ��X�hܯu�7B�.F�r���Mau�rm#5Ƕ��J�_�������_2]���u&'9������	��a�gdcpk��:�PG�h_Y�R�dEf�����)'���K�E�਽ӣ#rNQBJ�����>F���B�#��(x�j�K����+���dyg����>����¶��Gwm���7��W����7#_'L��"bM���cڹ�[V��wG�Y�h���U��f���Y����ً�q�3�c�S
D�;�gY�5�}��f��W�f�C�}�3���N������C�A4�#
:u�5D�����?s�5
������
�'�ζ��@��M����D���g������}��v�R�f�F����2*>�������ޑ�         2  x�=���E!�̖�����ci�z��QQ�90��+�5`	[�י ��8�w)Ⱥ�$Z�	qHU"Z3�4�8�-��-g�PiG��v�Ҟ��lB�f*�g3�ȡ�a��ѯ���@��e�~�O�Z�O�O��6_���2����T?����7]kBķb�er��w�ڵ jז�+�" ���{���A�{B̼Ung�*סr��mwC�P�x�^�j�{c�cf�nT����qs�H7�b<��s^�(.�T��E���s�ux�s.���_��:g>mjG!I�1S+�����h         (  x�m�ْ�:����o�I LW�<��S+X�M��2�F�9΋�hO�����	E폵��"I�<��n�a�R�t���%����?'
�gl?#�l�"�aŝX=a� 62�٥=T6���:�^�ֵG�#嗢��/`�I�u�kH�1�E���n�Za�X"d)��$�R*��|Ԇo�&���������SxFzv����o���NnǍ��ύ���q+5^i�D Q��^[�#T�HD��0a�Q\�G��c����s>	TzݴZ��&E�kn@[ƫEn-*yh�.��m��k�V����� �@ª*��[���G���쾼��6��PsM�z~1qG��t�^/��Ѕ��~P�����7��uhl�ۀj�D�%TM�H�I�o�\��6|q a���p��o��<�!�'.X7���fI��-���HzH��t�%[ceX��e4h���v�o���ij*i	�&>��������氺���7F��v��`�9�Kcw�˩=�Wu�Z����s��1P���tu��$ˈ�9���H���0��e'�
X%)w	}��E�'��'짾���j8�EsVF[��N���'��x��t�<g��J�"C�fIԉ�$CU�d
�>�)B���:��ϭ3e��T,�gh�V6�Gm�*�H'�%�v�5H�2p���7�XC��5�@#H�AB���ٵLP4(���)Q���,?!Q�4Ok�������iqM�jG3*�b�5�s{�i4O�$Oawh��⳶3gg�Ecs�kD�������n'<���"j��r��?p��?��g��J�����^O=XX�P7�x�V�L�N�u�
�3:�Xo6�3��"X#�����9X�epU�'v��AQ�]�����c��z����Y�˃fY��*�����ȡk5@[-&��v.�q���Y�%���Ru����BDL�@~ً|������4�ad�^2��}�!�>�����}�6�x?_#�~+�RB�*hǋ�j{�������<���@�K���
�D�uP��	�=��xzz��1��     