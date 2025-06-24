package com.gonzales.liam.agromobile

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.gonzales.liam.agromobile.databinding.ActivityLoginBinding
import com.gonzales.liam.agromobile.models.User
import com.gonzales.liam.agromobile.network.RetrofitClient
import com.gonzales.liam.agromobile.utils.AuthManager
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var googleSignInClient: GoogleSignInClient
    private lateinit var authManager: AuthManager

    private val signInLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        val task = GoogleSignIn.getSignedInAccountFromIntent(result.data)
        try {
            val account = task.getResult(ApiException::class.java)
            val idToken = account.idToken

            if (idToken != null) {
                authenticateWithBackend(idToken)
            } else {
                Toast.makeText(this, "Error: No se pudo obtener el token", Toast.LENGTH_LONG).show()
            }
        } catch (e: ApiException) {
            Log.e("LoginActivity", "Error en Google Sign-In: ${e.message}")
            Toast.makeText(this, "Error en autenticación: ${e.message}", Toast.LENGTH_LONG).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        authManager = AuthManager(this)

        // Verificar si ya está logueado
        if (authManager.isLoggedIn()) {
            goToDashboard()
            return
        }

        setupGoogleSignIn()
        setupClickListeners()
    }

    private fun setupGoogleSignIn() {
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(getString(R.string.web_client_id))
            .requestEmail()
            .build()
        googleSignInClient = GoogleSignIn.getClient(this, gso) // <-- BIEN
    }

    private fun setupClickListeners() {
        binding.btnSignIn.setOnClickListener {
            signInWithGoogle()
        }
    }

    private fun signInWithGoogle() {
        val signInIntent = googleSignInClient.signInIntent
        signInLauncher.launch(signInIntent)
    }

    private fun authenticateWithBackend(idToken: String) {
        lifecycleScope.launch {
            try {
                binding.btnSignIn.isEnabled = false
                binding.btnSignIn.text = "Autenticando..."

                val response = RetrofitClient.apiService.authenticate("Bearer $idToken")

                if (response.isSuccessful && response.body()?.success == true) {
                    val authResponse = response.body()!!

                    val user = User(
                        userId = authResponse.userId ?: "",
                        email = authResponse.email ?: "",
                        name = authResponse.name ?: "",
                        picture = authResponse.picture
                    )

                    authManager.saveUser(user)
                    goToDashboard()
                } else {
                    val errorMsg = response.body()?.message ?: "Error en autenticación"
                    Toast.makeText(this@LoginActivity, errorMsg, Toast.LENGTH_LONG).show()
                }
            } catch (e: Exception) {
                Log.e("LoginActivity", "Error en autenticación: ${e.message}")
                Toast.makeText(this@LoginActivity, "Error de conexión: ${e.message}", Toast.LENGTH_LONG).show()
            } finally {
                binding.btnSignIn.isEnabled = true
                binding.btnSignIn.text = getString(R.string.sign_in_with_google)
            }
        }
    }

    private fun goToDashboard() {
        startActivity(Intent(this, DashboardActivity::class.java))
        finish()
    }
}