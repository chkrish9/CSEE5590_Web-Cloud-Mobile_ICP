package com.umkc.firebase;

public class UserDetailsModel {
    String id;
    String name;
    String phone;

    public UserDetailsModel() {
    }

    public UserDetailsModel(String id, String name, String phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }
}
