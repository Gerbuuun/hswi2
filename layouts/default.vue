<template>
  <div>
    <div class="prose-2xl bg-base-300 text-center p-5" @click="navigateTo('/')">HOE SNEL WAS IK?</div>

    <div class="w-full">
      <slot />
    </div>

    <footer class="footer footer-center p-10 bg-base-300 text-base-content">
      <div class="grid grid-flow-col gap-4">
        <a class="link link-hover" target="_blank" href="https://www.poweredbyiris.nl">Over ons</a>
        <a class="link link-hover" target="_blank" href="https://www.poweredbyiris.nl/contact">Contact</a>
        <a class="link link-hover" target="_blank" href="https://forms.gle/kVnTnh3qq7xjD6Sp6">Feedback</a>
      </div>
      <div>
        <div class="grid grid-flow-col gap-4">
          <a target="_blank" href=""><Icon name="simple-icons:facebook" size="24px" /></a>
          <a target="_blank" href=""><Icon name="simple-icons:instagram" size="24px" /></a>
          <a target="_blank" href="https://github.com/Proteus-Eretes/hswi2"
            ><Icon name="simple-icons:github" size="24px"
          /></a>
        </div>
      </div>
      <div>
        <p>
          Copyright © 2022 - All right reserved by
          <a class="link link-hover" target="_blank" href="https://www.proteus-eretes.nl">D.S.R. Proteus-Eretes</a>
        </p>
      </div>
    </footer>
  </div>
</template>
