package com.gonzales.liam.agromobile.models

data class AuthResponse(
    val success: Boolean,
    val authenticated: Boolean,
    val userId: String?,
    val email: String?,
    val name: String?,
    val picture: String?,
    val message: String?
)