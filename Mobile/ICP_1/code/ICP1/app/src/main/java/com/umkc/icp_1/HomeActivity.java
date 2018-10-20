package com.umkc.icp_1;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class HomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        TextView lblName = findViewById(R.id.lblName);
        String username = getIntent().getStringExtra("username");
        lblName.setText("Hi " + username);
    }

    /*
    * This method will call when the user clicks on logout button. It will redirect to login page.
    */
    public void logout(View view) {
        Intent redirect = new Intent(HomeActivity.this, LoginActivity.class);
        startActivity(redirect);
    }
}
