package io.kavindra.kavindra_api_gateway.config

import com.nimbusds.jose.JWSAlgorithm
import com.nimbusds.jose.jwk.OctetSequenceKey
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer.withDefaults
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder
import org.springframework.security.web.server.SecurityWebFilterChain

@Configuration
@EnableWebFluxSecurity
class SecurityConfig(
  private val supabaseJwtProperties: SupabaseJwtProperties
) {

  @Bean
  fun securityWebFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain {
    http.csrf { it.disable() }
    http.oauth2ResourceServer { it.jwt(withDefaults()) }
    http.authorizeExchange {
      it.pathMatchers("/v1/payments/plans").permitAll()
      it.pathMatchers("/v1/feedback-widget.js").permitAll()
      it.pathMatchers("/v1/kavindra-widget.js").permitAll()
      it.anyExchange().authenticated()
    }
    return http.build()
  }

  @Bean
  fun reactiveJwtDecoder(): ReactiveJwtDecoder {
    return NimbusReactiveJwtDecoder.withSecretKey(
      OctetSequenceKey
        .Builder(supabaseJwtProperties.secret.toByteArray())
        .algorithm(JWSAlgorithm.HS256)
        .build()
        .toSecretKey()
    ).build()
  }

}
