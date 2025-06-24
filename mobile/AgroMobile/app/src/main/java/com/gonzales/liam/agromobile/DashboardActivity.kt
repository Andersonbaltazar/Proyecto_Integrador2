package com.gonzales.liam.agromobile
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.gonzales.liam.agromobile.databinding.ActivityDashboardBinding
import com.gonzales.liam.agromobile.utils.AuthManager

class DashboardActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDashboardBinding
    private lateinit var authManager: AuthManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)
        setContentView(binding.root)

        authManager = AuthManager(this)

        // Verificar autenticación
        if (!authManager.isLoggedIn()) {
            goToLogin()
            return
        }

        setupUserInfo()
        setupClickListeners()
    }

    private fun setupUserInfo() {
        val user = authManager.getUser()
        user?.let {
            binding.tvWelcome.text = "¡Hola, ${it.name}!"
            binding.tvEmail.text = it.email

            // Aquí puedes cargar la imagen del usuario si usas una librería como Glide
            // Glide.with(this).load(it.picture).into(binding.ivProfile)
        }
    }

    private fun setupClickListeners() {
        binding.btnLogout.setOnClickListener {
            logout()
        }

        // Aquí puedes agregar más botones para navegar a otras pantallas
        // binding.btnCultivos.setOnClickListener { /* Ir a cultivos */ }
    }

    private fun logout() {
        // Cerrar sesión en Google
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).build()
        val googleSignInClient = GoogleSignIn.getClient(this, gso)
        googleSignInClient.signOut().addOnCompleteListener {
            authManager.logout()
            goToLogin()
        }
    }

    private fun goToLogin() {
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }
}