package io.kavindra.kavindra_api_gateway

import io.kavindra.kavindra_api_gateway.config.SupabaseJwtProperties
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(SupabaseJwtProperties::class)
class KavindraApiGatewayApplication

fun main(args: Array<String>) {
	runApplication<KavindraApiGatewayApplication>(*args)
}
