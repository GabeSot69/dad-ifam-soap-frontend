package com.fourcats.dev.jaxwscrud.client.soap_client.model;

import java.util.Date;

public class Produto {
    private Date data;
    private Long id;
    private String nome;
    private int quantidade;
    private Double precoUnitario;

    public Produto(Date data, Long id, String nome, int quantidade, Double precoUnitario) {
        this.data = data;
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }

    public Date getData() {
        return data;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public Double getPrecoUnitario() {
        return precoUnitario;
    }

    @Override
    public String toString() {
        return "Produto{" +
                "nome='" + nome + '\'' +
                ", preco=" + precoUnitario +
                ", data=" + data +
                '}';
    }

}
