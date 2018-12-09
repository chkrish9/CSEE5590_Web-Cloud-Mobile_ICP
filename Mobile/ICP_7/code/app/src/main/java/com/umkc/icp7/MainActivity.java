package com.umkc.icp7;

import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.Button;

import java.util.Calendar;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button disp = (Button) findViewById(R.id.dispbut);
        disp.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub
                disp();
            }
        });
    }

    public void disp() {
        Calendar startTime = Calendar.getInstance();
        startTime.set(2013, 2, 13, 11, 35);
        Uri uri = Uri.parse("content://com.android.calendar/time/"
                + String.valueOf(startTime.getTimeInMillis()));
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        // Use the Calendar app to view the time.
        startActivity(intent);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        return true;
    }

    // On Click of Show Calendar View
    public void calendarViewActivity(View view) {
        // Redirecting to new activity
        Intent intent = new Intent(MainActivity.this, CalendarActivity.class);
        startActivity(intent);
    }
}
