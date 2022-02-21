import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

const schema = yup.object({
  firstName: yup
    .string("Seu nome deve conter apenas letras")
    .min(3, "Nome deve ter mais do que 3 caracteres")
    .required("Esse campo é obrigatório"),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  age: yup
    .number("Idade inválida")
    .min(18, "Idade mínima: 18 anos")
    .max(60, "Idade máxima: 60 anos")
    .integer("Apenas valores inteiros")
    .required(),
  password: yup
    .string()
    .required("Por favor, digite sua senha.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "A senha deve conter pelo menos 8 caracteres, uma maiúscula, um número e um caractere especial."
    ),
  // Caso queira adicionar confirmação de email: https://dev.to/estheragbaje/how-to-build-a-simple-form-with-validation-using-yup-and-formik-beginner-friendly-521j#:~:text=your%20age%22)%20.-,min(18%2C%20%22You%20must%20be%20at%20least%2018%20years,email()%20.
});

export default function FormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [formData, setFormData] = useState({});

  const onSubmit = (data) => setFormData(data);

  return (
    <Wrapper>
      <h1>React Hook Form + Validação Yup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*  */}
        <label htmlFor="first"> Nome: </label>
        <input id="first" placeholder="Nome" {...register("firstName")} />
        <p>{errors.firstName?.message}</p>
        {/*  */}
        <label htmlFor="email"> Email: </label>
        <input id="email" placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>
        {/*  */}
        <label htmlFor="idade"> Idade: </label>
        <input
          id="idade"
          placeholder="Idade"
          type="number"
          {...register("age")}
        />
        <p>{errors.age?.message}</p>
        {/*  */}
        <label htmlFor="senha"> Senha: </label>
        <input
          id="senha"
          placeholder="Senha"
          type="password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        {/*  */}
        <input type="submit" />
      </form>
      <section className="form-data">
        <p>{JSON.stringify(formData)}</p>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  width: 50%;
  margin: 5rem auto;
  h1 {
    margin: 0 auto;
  }
  form {
    display: grid;
    width: 70%;
    padding: 2rem;
    gap: 1rem;
    margin: 0 auto;
    max-width: 700px;
    background-color: #f0f2f5;
    border-radius: 4px;

    input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      border-radius: 4px;
      border: 1px solid white;
      padding: 10px 15px;
      margin-bottom: 10px;
      font-size: 14px;
    }
    input[type="submit"] {
      margin-top: 1rem;
      background-color: white;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      font-weight: 600;
    }
    input[type="submit"]:hover {
      background-color: hsl(205, 86%, 17%);
      color: #f0f2f5;
      letter-spacing: 0.1rem;
      font-weight: 600;
    }
  }
`;
