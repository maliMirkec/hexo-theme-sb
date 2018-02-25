/**
 * A better font loading using FontFaceObserver.
 *
 * @module CriticalFOFT
 * @author Zach Leatherman
 * @see https://www.zachleat.com/web/comprehensive-webfonts/#critical-foft
 */

/**
 * @constructor
 * @author Zach Leatherman
 * @see https://www.zachleat.com/web/comprehensive-webfonts/#critical-foft
 */
let FontFaceObserver;

// =include fontfaceobserver/fontfaceobserver.js

/**
 * @function
 * @name Anonymous self-invoked function
 * @description Adds classes to document when each font loads successfully.
 * If fonts are already loaded, then skip loading.
 */
(function () {
  if (window.sessionStorage.criticalFoftDataUriFontsLoaded1) {
    document.documentElement.className += ' fonts-stage-1 fonts-stage-2'
    return
  }

  /**
   * A subset of default font type.
   *
   * @const
   * @name fontASubset
   * @type {Object}
   */
  const fontASubset = new FontFaceObserver('Vollkorn Subset', {
    weight: 'normal',
    style: 'normal'
  })

  const fontBSubset = new FontFaceObserver('Playfair Display Bold Subset', {
    weight: 700,
    style: 'normal'
  })

  /**
   * A promise that adds 'fonts-stage-1' if {@link fontASubset}
   * is loaded successfully.
   *
   * @method
   * @name Promise
   */
  Promise.all([fontASubset.load(), fontBSubset.load()]).then(() => {
    document.documentElement.className += ' fonts-stage-1'

    /**
     * Default font type.
     *
     * @const
     * @name fontA
     * @type {Object}
     */
    const fontA = new FontFaceObserver('Vollkorn', {
      weight: 'normal',
      style: 'normal'
    })

    const fontB = new FontFaceObserver('Playfair Display Bold', {
      weight: 700,
      style: 'normal'
    })

    console.log(`Subset fonts loaded.`)

    /**
     * A promise that adds 'fonts-stage-2' if
     * {@link fontA}
     * are loaded successfully.
     * Also, set Critical FOFT session variable to true.
     *
     * @method
     * @name Promise
     */
    Promise.all([fontA.load(), fontB.load()]).then(() => {
      document.documentElement.className += ' fonts-stage-2'

      // Optimization for Repeat Views
      window.sessionStorage.criticalFoftDataUriFontsLoaded1 = true

      console.log(`Main fonts loaded.`)
    }, () => {
      console.log(`Main fonts not loaded.`)
    })
  }, () => {
    console.log(`Subset fonts not loaded.`)
  })
})()
