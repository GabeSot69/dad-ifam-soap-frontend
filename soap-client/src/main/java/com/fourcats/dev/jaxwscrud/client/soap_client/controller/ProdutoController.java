package com.fourcats.dev.jaxwscrud.client.soap_client.controller;

import com.fourcats.dev.jaxwscrud.client.soap_client.SoapClient;
import com.fourcats.dev.jaxwscrud.client.soap_client.model.Produto;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@RestController
public class ProdutoController {

    @GetMapping("/api/produtos")
    public List<Produto> listarProdutos() {
        // Chama o cliente SOAP
        List<Produto> produtos = new ArrayList<>();
        try {
            produtos = SoapClient.getProdutos();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return produtos;
    }

    @GetMapping("/api/produtos/{id}")
    public Produto consultarProduto(@PathVariable long id) {
        // Chama o cliente SOAP
        try {
            return SoapClient.consultarProduto(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @PutMapping("/api/produtos/{id}")
    public Produto alterarProduto(@RequestBody Produto produto) {
        // Chama o cliente SOAP
        try {
            return SoapClient.alterarProduto(produto);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}