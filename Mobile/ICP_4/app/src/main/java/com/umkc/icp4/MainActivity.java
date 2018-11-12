package com.umkc.icp4;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity {
    Intent redirect = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void getLocationDetails(View view) {
        redirect = new Intent(MainActivity.this,MapsActivity.class);
        startActivity(redirect);
    }

    public void takePhoto(View view) {
        redirect = new Intent(MainActivity.this,CameraActivity.class);
        startActivity(redirect);
    }

    public void recordVoice(View view) {
        redirect = new Intent(MainActivity.this,RecordActivity.class);
        startActivity(redirect);
    }

    public void saveData(View view) {
        redirect = new Intent(MainActivity.this,StoreActivity.class);
        startActivity(redirect);
    }
}
