package io.kavindra.kavindra_api_gateway.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "kavindra.cors")
data class CorsConfigurationProperties(val origin: String)
