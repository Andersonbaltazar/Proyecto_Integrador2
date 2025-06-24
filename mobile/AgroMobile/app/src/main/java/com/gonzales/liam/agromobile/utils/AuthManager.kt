package com.gonzales.liam.agromobile.utils

import android.content.Context
import android.content.SharedPreferences
import com.gonzales.liam.agromobile.models.User

class AuthManager(context: Context) {

    private val prefs: SharedPreferences = context.getSharedPreferences(
        "auth_prefs", Context.MODE_PRIVATE
    )

    fun saveUser(user: User) {
        prefs.edit().apply {
            putString("user_id", user.userId)
            putString("email", user.email)
            putString("name", user.name)
            putString("picture", user.picture)
            putBoolean("is_logged_in", true)
            apply()
        }
    }

    fun getUser(): User? {
        if (!isLoggedIn()) return null

        return User(
            userId = prefs.getString("user_id", "") ?: "",
            email = prefs.getString("email", "") ?: "",
            name = prefs.getString("name", "") ?: "",
            picture = prefs.getString("picture", null)
        )
    }

    fun isLoggedIn(): Boolean {
        return prefs.getBoolean("is_logged_in", false)
    }

    fun logout() {
        prefs.edit().clear().apply()
    }
}