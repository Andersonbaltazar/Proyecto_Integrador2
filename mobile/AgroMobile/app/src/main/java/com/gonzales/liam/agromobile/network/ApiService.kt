package com.gonzales.liam.agromobile.network

import com.gonzales.liam.agromobile.models.AuthResponse
import retrofit2.Response
import retrofit2.http.Header
import retrofit2.http.POST

interface ApiService {

    @POST("api/mobile/auth")
    suspend fun authenticate(
        @Header("Authorization") authorization: String
    ): Response<AuthResponse>

    // Aquí puedes agregar más endpoints según tu Spring Boot
    // @GET("api/cultivos")
    // suspend fun getCultivos(): Response<List<Cultivo>>
}