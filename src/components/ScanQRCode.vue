<template>
  <div>
    <v-row>
      <v-col cols="12" :lg="sizeLg" class="mx-auto">
        <v-row>
          <v-col cols="12" sm="5" md="4" lg="3">
            <div class="d-flex justify-center align-center">
              <v-img :src="qrCode" max-width="200" max-height="200"></v-img>
            </div>
          </v-col>
          <v-col cols="9" sm="7" md="8" lg="9" class="pt-0 mx-auto title font-weight-medium text-center d-flex align-center">
            <slot name="body"></slot>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
  props: ['qrCode', 'sizeLg'],
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