// =====================================================
// Title                 :   Android Application 
// Author                :   Sasanka Withanage
// Last modified Date    :   03 May 2020
// =====================================================

package com.example.agrobuddy;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {
    
    // Web view element imported.
    private WebView myWebView;

    // Initialize the process and started the process.
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Startup the webpage in the initial startup.
        myWebView = (WebView)findViewById(R.id.webView);
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        myWebView.loadUrl("https://agrobuddy.tech/#/");
        myWebView.setWebViewClient(new WebViewClient());
    }

    // Go back to previous page with the back button.
    @Override
    public void onBackPressed() {
        if(myWebView.canGoBack()) {
            myWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    // Displaying Menu.
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    // Display options.
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
