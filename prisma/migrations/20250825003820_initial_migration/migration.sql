-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "apellido" VARCHAR(20) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."materias" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "descripcion" VARCHAR(20),
    "creditos" VARCHAR(10) NOT NULL,

    CONSTRAINT "materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estudiantes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,
    "apellido" VARCHAR(20) NOT NULL,
    "cedula" VARCHAR(20) NOT NULL,
    "fecha_nacimiento" VARCHAR(20) NOT NULL,
    "ciudad" VARCHAR(20) NOT NULL,
    "direccion" VARCHAR(10) NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "email" VARCHAR(20) NOT NULL,

    CONSTRAINT "estudiantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."matriculas" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "descripcion" VARCHAR(20) NOT NULL,
    "estudiante_id" INTEGER NOT NULL,
    "materia_id" INTEGER NOT NULL,

    CONSTRAINT "matriculas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."matriculas" ADD CONSTRAINT "matriculas_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "public"."estudiantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matriculas" ADD CONSTRAINT "matriculas_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "public"."materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
