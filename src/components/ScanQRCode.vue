<template>
  <div>
    <v-row>
      <v-col cols="12" sm="10" md="9" lg="8" class="d-flex justify-center mt-10 mx-auto">
        <v-img :src="qrCode" max-width="200" max-height="200"></v-img>
        <span class="ml-5 mt-5 title font-weight-medium">{{infoQrCode}}</span>
      </v-col>
      <!-- Integrate con SSI -->
      <slot name="body"></slot>
    </v-row>
    <!-- Steps -->
    <v-row>
      <template v-for="(v, k) in steps">
        <v-col :key="k" cols="8" sm="6" md="4" class="mt-10 mx-auto">
          <div class="d-flex align-center justify-center">
            <v-badge bordered color="error" icon="mdi-lock" overlap>
              <v-btn class="mx-2" fab dark small color="primary">{{v.number}}</v-btn>
            </v-badge>
            <v-img :src="require(`@/assets/store/${v.icon}`)" max-width="100" max-height="100"></v-img>
          </div>
          <div class="d-flex align-center justify-center">
            <span class="text-center">{{v.text}}</span>
          </div>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ['qrCode', 'infoQrCode'],
  data: () => ({
    steps: [
      {
        icon: 'smartphone1.png',
        text: 'Open SiriusID app.',
        number: '1'
      },
      {
        icon: 'smartphone2.png',
        text: 'Touch the QR code to scan.',
        number: '2'
      },
      {
        icon: 'smartphone3.png',
        text: 'Point the camera at the QR code above.',
        number: '3'
      }
    ]
  })
}
</script>