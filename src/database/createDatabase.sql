CREATE TABLE "songs" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"link" varchar(255) NOT NULL UNIQUE,
	"score" int NOT NULL,
	CONSTRAINT "songs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);