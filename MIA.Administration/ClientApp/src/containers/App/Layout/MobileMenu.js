import React from 'react';
import { Trans } from '@lingui/macro';

class MobileMenu extends React.PureComponent {

  render() {
    const {menuOpened, toggleMenu} = this.props;
    return (
      <div className={`modal-wrap ${menuOpened? " open" :""}` }style={{overflow: "hidden auto"}}>
			<div className="modal-container">
				<div className="modal-content">
					<div className="popup popup--full">
						<div className="popup-logo">
							<div className="popup-logo__title"><Trans id="mia"> mia </Trans></div>
						</div>

						<div className="grid grid--1">
							<div className="form-group">
								<div className="form-group__wrap form-group__wrap--shadow">
									{/* <!--todo add class "open" for hd-langs to show dropdown -->*/}
									<div className="hd-langs" onclick="function f(el){(!el.classList.value.includes('open'))?el.classList.add('open'):el.classList.remove('open');};f(this);">
										<span className="hd-langs__icon flag flag-us-v2">
										</span>
										<span className="hd-langs__text"><Trans id="language"> Language </Trans></span>
										<div className="hd-dropdown hd-dropdown--langs">

											<div className="langs hd-drop">
												<div className="hd-drop__group">
													<div className="hd-drop__title hd-drop__title--bg">
														<Trans id="suggested_languages"> Suggested languages </Trans>
													</div>
													<ul className="hd-drop__list">
														{/* <!--todo add class selected for current lang-->*/}
														<li className="hd-drop__list-item selected">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-us-v2"></span>
																<span>English</span>
															</a>
														</li>
													</ul>
												</div>

												<div className="hd-drop__group langs-all">
													<div className="hd-drop__title hd-drop__title--bg">
														<Trans id="all_languages"> All languages </Trans>
													</div>
													<ul className="hd-drop__list">

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ru">
																</span>
																<span>Русский</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ae">
																</span>
																<span>العربية</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-de">
																</span>
																<span>Deutsch</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ru">
																</span>
																<span>Русский</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ae">
																</span>
																<span>العربية</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-de">
																</span>
																<span>Deutsch</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ru">
																</span>
																<span>Русский</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ae">
																</span>
																<span>العربية</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-de">
																</span>
																<span>Deutsch</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ru">
																</span>
																<span>Русский</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ae">
																</span>
																<span>العربية</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-de">
																</span>
																<span>Deutsch</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ru">
																</span>
																<span>Русский</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ae">
																</span>
																<span>العربية</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-de">
																</span>
																<span>Deutsch</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ru">
																</span>
																<span>Русский</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ae">
																</span>
																<span>العربية</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-de">
																</span>
																<span>Deutsch</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ru">
																</span>
																<span>Русский</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ae">
																</span>
																<span>العربية</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-de">
																</span>
																<span>Deutsch</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ru">
																</span>
																<span>Русский</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ae">
																</span>
																<span>العربية</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-de">
																</span>
																<span>Deutsch</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ru">
																</span>
																<span>Русский</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-ae">
																</span>
																<span>العربية</span>
															</a>
														</li>

														<li className="hd-drop__list-item">
															<a href="#" className="hd-drop__list-link">
																<span className="flag flag-de">
																</span>
																<span>Deutsch</span>
															</a>
														</li>

													</ul>

												</div>
											</div>

										</div>
									</div>
								</div>
							</div>

							<div className="form-group">
								<div className="form-group__wrap form-group__wrap--shadow">
									{/* <!--todo add class "open" for hd-currency to show dropdown -->*/}
									<div className="hd-currency" onclick="function f(el){(!el.classList.value.includes('open'))?el.classList.add('open'):el.classList.remove('open');};f(this);">
										<span className="hd-currency__text">Currency</span>
										<div className="hd-dropdown hd-dropdown--currency">

											<div className="currency hd-drop">
												<div className="hd-drop__group">
													<div className="hd-drop__title hd-drop__title--bg">
														Price display
													</div>
													<ul className="hd-drop__list">
														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span>Base price per night</span>
																</span>
															</a>
														</li>
														<li className="hd-drop__list-item currency__item selected">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span>Total price per night</span>
																</span>
															</a>
														</li>
													</ul>
												</div>

												<div className="hd-drop__group">
													<div className="hd-drop__title hd-drop__title--bg">
														Suggested currencies
													</div>
													<ul className="hd-drop__list">
														<li className="hd-drop__list-item currency__item selected">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">SAR</span>
																	<span>Saudi Riyal</span>
																</span>
															</a>
														</li>
													</ul>
												</div>

												<div className="hd-drop__group">
													<div className="hd-drop__title hd-drop__title--bg">
														Popular currencies
													</div>
													<ul className="hd-drop__list">
														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">₧</span>
																	<span>Philippine Peso</span>
																</span>
															</a>
														</li>
														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">RM</span>
																	<span>Malays. Ringgit</span>
																</span>
															</a>
														</li>
														<li className="hd-drop__list-item currency__item selected">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">$</span>
																	<span>US Dollar</span>
																</span>
															</a>
														</li>
													</ul>
												</div>

												<div className="hd-drop__group">
													<div className="hd-drop__title hd-drop__title--bg">
														All currencies
													</div>
													<ul className="hd-drop__list">

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Philippine Peso</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Malays. Ringgit</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>US Dollar</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Philippine Peso</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Malays. Ringgit</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>US Dollar</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Philippine Peso</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Malays. Ringgit</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>US Dollar</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Philippine Peso</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Malays. Ringgit</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>US Dollar</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Philippine Peso</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Malays. Ringgit</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>US Dollar</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Philippine Peso</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Malays. Ringgit</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>US Dollar</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Philippine Peso</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Malays. Ringgit</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>US Dollar</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Philippine Peso</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Malays. Ringgit</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>US Dollar</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Philippine Peso</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Malays. Ringgit</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>US Dollar</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Philippine Peso</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>Malays. Ringgit</span>
																</span>
															</a>
														</li>

														<li className="hd-drop__list-item currency__item">
															<a href="#" className="hd-drop__list-link">
																<span className="currency__text">
																	<span className="currency__abbr">MR</span>
																	<span>US Dollar</span>
																</span>
															</a>
														</li>

													</ul>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="hd-login">
							<span className="hd-login__sign-in hd-sign-in"><Trans id="sign_in"> sign in </Trans></span>
							<span className="hd-login__sign-up hd-sign-up"><Trans id="create_account"> Create account </Trans></span>
						</div>

						<div className="socials">
							<div className="socials__links">
								<a href="#" className="socials__link">
									<svg width="17" height="17">
										<use href="#twitter"></use>
									</svg>
								</a>
								<a href="#" className="socials__link">
									<svg width="17" height="17">
										<use href="#facebook"></use>
									</svg>
								</a>
								<a href="#" className="socials__link">
									<svg width="17" height="17">
										<use href="#instagram"></use>
									</svg>
								</a>
							</div>
						</div>

						<div className="contacts-item">
							<a href="tel:090899898933" className="contacts-item__link">
								<svg width="15" height="15">
									<use href="#phone"></use>
								</svg>
								<span>090 899 89 89 33</span>
							</a>
							<a href="#" className="contacts-item__link">
								<svg width="15" height="15">
									<use href="#envelope"></use>
								</svg>
								<span>service@mia.com</span>
							</a>
						</div>

						<div className="mb-copyright">
							<span>&copy;<Trans id="all_rights_reserved"> All rights reserved</Trans></span>
						</div>

						<button title="Close (ESC)" type="button" className="modal-close" onClick={toggleMenu}>
							<span className="svg">
								<svg width="30" height="30">
									<use href="#cancel"></use>
								</svg>
							</span>
						</button>
					</div>
				</div>
				<div className="modal-preloader"><Trans id="loading"> Loading.... </Trans></div>
			</div>
		</div>
    )
  }
}

export default MobileMenu;