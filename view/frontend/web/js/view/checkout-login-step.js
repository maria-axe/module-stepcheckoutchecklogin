define(
    [
        'ko',
        'uiComponent',
        'underscore',
        'Magento_Checkout/js/model/step-navigator',
        'Magento_Customer/js/model/customer',
        'mage/translate'
    ],
    function (
        ko,
        Component,
        _,
        stepNavigator,
        customer,
        $t
    ) {
        'use strict';
        /**
        * check-login - é o nome do modelo .html do componente
        */
        return Component.extend({
            defaults: {
                template: 'Webjump_StepCheckoutCheckLogin/check-login'
            },

            //adicione aqui sua lógica para exibir a etapa,
            isVisible: ko.observable(true),
            isLogedIn: customer.isLoggedIn(),
            //o código da etapa será usado como ID do conteúdo da etapa no modelo de componente
            stepCode: 'isLogedCheck',
            //valor do título da etapa
            stepTitle: $t('Logging Status'),

            /**
            *
            * @returns {*}
            */
            initialize: function () {
                this._super();
                // cadastre seu passo
                
                stepNavigator.registerStep(
                    this.stepCode,
                    //passo alias
                    null,
                    this.stepTitle,
                    //propriedade observável com lógica ao exibir etapa ou ocultar etapa
                    this.isVisible,

                    

                    _.bind(this.navigate, this),

                    /**
                    * valor da ordem de classificação
                    * 'sort order value' < 10: a etapa é exibida antes da etapa de envio;
                    * 10 < 'sort order value' < 20 : a etapa é exibida entre a etapa de envio e a etapa de pagamento
                    * 'classificar valor do pedido' > 20 : a etapa é exibida após a etapa de pagamento
                    */
                    15
                );

                return this;
            },

            /**
            * O método navegate() é responsável pela navegação entre a etapa de checkout
            * durante a compra. Você pode adicionar lógica personalizada, por exemplo, algumas condições
            * para mudar para sua etapa personalizada.
            */
            navigate: function () {
                var self = this;
                self.isVisible(true); // caso não tenha esta lógica, quando eu estiver nagevando, não irá carregar deviamdente meu step. 
            },
           
            /**
            * @returns void
            */
            navigateToNextStep: function () {
                stepNavigator.next();
            }
        });
    }
);
