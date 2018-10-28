package com.coffee.coffee;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class OrderActivity extends AppCompatActivity {
    public String total;
    public String orderedItems;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order);
        total = getIntent().getStringExtra("total");
        orderedItems = getIntent().getStringExtra("orderedItems");
        TextView lblOrderSummary =findViewById(R.id.lblOrderSummary);
        lblOrderSummary .setText("Total : "+total+ "\n\n Ordered Items : \n"+orderedItems );
    }

    public void pay(View view) {
        Intent emailIntent = new Intent(Intent.ACTION_SEND);
        // The intent does not have a URI, so declare the "text/plain" MIME type
        emailIntent.setType("plain/text");
        // Recipients
        emailIntent.putExtra(Intent.EXTRA_EMAIL, new String[] {"PizzaOrder@gmail.com"});
        // Adding Subject
        emailIntent.putExtra(Intent.EXTRA_SUBJECT, "Order Summary");
        // Adding the Order Summary Text
        emailIntent.putExtra(Intent.EXTRA_TEXT, "Total : "+total+ "\n\n Ordered Items : \n"+orderedItems);
        // Redirecting to Email Intent
        startActivity(Intent.createChooser(emailIntent, ""));
    }
}
