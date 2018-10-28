package com.coffee.coffee;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class HomeActivity extends AppCompatActivity {
    public String orderedItems;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
    }

    public void add(View view) {
        CheckBox chkCapp = findViewById(R.id.chkCapp);
        CheckBox chkFlat = findViewById(R.id.chkFlat);
        CheckBox chkLatte = findViewById(R.id.chkLatte);
        EditText txtCappQty= findViewById(R.id.txtCappQty);
        EditText txtFlatQty= findViewById(R.id.txtFlatQty);
        EditText txtLatteQty= findViewById(R.id.txtLatteQty);

        Boolean cappValue =chkCapp.isChecked();
        Boolean flatValue =chkFlat.isChecked();
        Boolean latteValue =chkLatte.isChecked();
        Integer cappQtyValue = 0;
        Integer flatQtyValue =0;
        Integer latteQtyValue=0;

        if(!txtCappQty.getText().toString().isEmpty()){
            cappQtyValue = Integer.parseInt(txtCappQty.getText().toString());
        }
        if(!txtFlatQty.getText().toString().isEmpty()){
            flatQtyValue =Integer.parseInt(txtFlatQty.getText().toString());
        }
        if(!txtLatteQty.getText().toString().isEmpty()){
            latteQtyValue =Integer.parseInt(txtLatteQty.getText().toString());
        }
        float total = calculate(cappValue,flatValue,latteValue,cappQtyValue,flatQtyValue,latteQtyValue);

        Intent redirect = new Intent(HomeActivity.this, OrderActivity.class).putExtra("total",total+"").putExtra("orderedItems",orderedItems);
        startActivity(redirect);
    }

    public float calculate(Boolean cappValue,Boolean flatValue,Boolean latteValue,Integer cappQtyValue,Integer flatQtyValue,Integer latteQtyValue){
        orderedItems="";
        float total =0;
        if(cappValue){
            total = total + (5 * cappQtyValue);
            orderedItems = orderedItems+" Cheese Pizza Quantity:"+cappQtyValue ;
        }
        if(flatValue){
            total = total + (10 * flatQtyValue);
            orderedItems = orderedItems+"\n Barbeque Chicken Pizza Quantity:"+flatQtyValue;
        }
        if(latteValue){
            total = total + (20 * latteQtyValue);
            orderedItems = orderedItems+"\n Panera Onion Quantity:"+latteQtyValue;
        }
        return total;
    }
}
