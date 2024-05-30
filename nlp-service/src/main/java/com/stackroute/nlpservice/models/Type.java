package com.stackroute.nlpservice.models;

import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public enum Type {

    /*    PERSON("Person"),
        CITY("City"),
        STATE_OR_PROVINCE("State_Or_Province"),
        COUNTRY("Country"),
        EMAIL("Email"),
        ORGANIZATION("Organization"),
        TITLE("Title");*/
    NN("Nn"),
    NNS("Nns"),
    NNP("Nnp"),
    NNPS("Nnps");

    private String type;

    Type(String type) {
        this.type = type;
    }

    public String getName() {
        return type;
    }


}
