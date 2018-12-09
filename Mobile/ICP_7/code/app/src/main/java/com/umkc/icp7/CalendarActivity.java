package com.umkc.icp7;

import android.content.Intent;
import android.provider.CalendarContract;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CalendarView;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class CalendarActivity extends AppCompatActivity {
    CalendarView simpleCalendarView;
    TextView dateView;

    int monthString, dayString, yearString;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendar);

        Button butinsert = (Button) findViewById(R.id.createEvent);
        butinsert.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                insert();
            }
        });

        // Fetching View by Id's
        simpleCalendarView = (CalendarView) findViewById(R.id.simpleCalendarView);
        dateView = (TextView) findViewById(R.id.dateView);

        // Showing Current Date First on Page Load
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        String selectedDate = sdf.format(new Date(simpleCalendarView.getDate()));
        // Setting to text view
        dateView.setText("Date: "+selectedDate);

        // On Change of Date
        simpleCalendarView.setOnDateChangeListener(new CalendarView.OnDateChangeListener() {
            @Override
            public void onSelectedDayChange(@NonNull CalendarView view, int year, int month, int dayOfMonth) {
                // Setting TextView by Day, month, year
                dateView.setText("Date: "+dayOfMonth+"/"+month+"/"+year);
                monthString = month;
                yearString = year;
                dayString = dayOfMonth;
            }
        });
    }

    public void insert() {
        Intent intent = new Intent(Intent.ACTION_INSERT,
                CalendarContract.Events.CONTENT_URI);
        // Add the calendar event details
        intent.putExtra(CalendarContract.Events.TITLE, "Web Class!");
        intent.putExtra(CalendarContract.Events.DESCRIPTION,
                "Learn Web & Mobile Programming");
        intent.putExtra(CalendarContract.Events.EVENT_LOCATION,
                "UMKC.com");
        Calendar startTime = Calendar.getInstance();

        // Set the Start time of Calendar
        Calendar startDate = Calendar.getInstance();
        startDate.set(Calendar.MONTH, monthString);
        startDate.set(Calendar.YEAR, yearString);
        startDate.set(Calendar.DAY_OF_MONTH, dayString);
        startDate.set(Calendar.HOUR_OF_DAY, 14);
        startDate.set(Calendar.MINUTE, 0);


        // Set the end time of calendar
        Calendar endDate = Calendar.getInstance();
        endDate.set(Calendar.MONTH, monthString);
        endDate.set(Calendar.YEAR, yearString);
        endDate.set(Calendar.DAY_OF_MONTH, dayString);
        endDate.set(Calendar.HOUR_OF_DAY, 17);
        endDate.set(Calendar.MINUTE, 0);


        startTime.set(yearString, monthString, dayString);
        intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME,
                startDate.getTimeInMillis());
        //intent.putExtra(CalendarContract.EXTRA_EVENT_ALL_DAY, true);
        intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, endDate.getTimeInMillis());
        intent.putExtra(Intent.EXTRA_EMAIL,"pondurivenkatesh9@gmail.com");
        // Use the Calendar app to add the new event.
        startActivity(intent);
    }
}
